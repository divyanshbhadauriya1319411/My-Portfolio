from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.email_service import send_contact_email
from app.logger import log_request_success, logger
from app.schemas import ContactRequest, ContactResponse, HealthResponse, StatusResponse
from app.security import verify_recaptcha_token
from app.utils import get_client_ip, get_user_agent

# Initialize rate limiter using true remote IP
limiter = Limiter(key_func=get_remote_address)

router = APIRouter()


@router.get(
    "/",
    response_model=StatusResponse,
    status_code=status.HTTP_200_OK,
    summary="Root status check",
    description="Returns API running status."
)
async def root() -> StatusResponse:
    """Root endpoint verifying that the FastAPI service is running."""
    return StatusResponse(status="running")


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Health check",
    description="Returns service health check success confirmation."
)
async def health_check() -> HealthResponse:
    """Health check endpoint for monitoring uptime checkers."""
    return HealthResponse(success=True)


async def _process_contact_submission(request: Request, contact: ContactRequest) -> JSONResponse:
    """
    Core handler for processing contact form submissions:
    1. Extracts true client IP address and User-Agent.
    2. Verifies optional Google reCAPTCHA v3/v2 token if present; returns HTTP 403 if rejected.
    3. Sends formatted HTML contact email via Resend API.
    4. Logs structured submission success and returns {success: true, message: "Your message has been sent successfully."}.
    """
    client_ip = get_client_ip(request)
    user_agent = get_user_agent(request)

    logger.info("Processing contact submission from IP: {} for email: {}", client_ip, contact.email)

    # 1. Verify Google reCAPTCHA token if included by frontend (raises RecaptchaVerificationError if verification fails)
    if contact.recaptchaToken:
        await verify_recaptcha_token(contact.recaptchaToken, remote_ip=client_ip)

    # 2. Send HTML contact email via Resend
    await send_contact_email(
        contact=contact,
        client_ip=client_ip,
        user_agent=user_agent
    )

    # 3. Log success and return exact structured JSON response
    log_request_success(client_ip, contact.email)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "success": True,
            "message": "Your message has been sent successfully."
        }
    )


@router.post(
    "/api/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    summary="Submit contact form (Primary API endpoint)",
    description="Validates contact form inputs and sends notification email via Resend API."
)
@limiter.limit("5/minute")
async def submit_contact_form(request: Request, contact: ContactRequest) -> JSONResponse:
    """
    Primary contact form endpoint (`POST /api/contact`) with strict rate limiting of 5 requests per minute per IP.
    """
    return await _process_contact_submission(request, contact)


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    summary="Submit contact form (Root alias)",
    description="Alias endpoint directing to the same validation and email delivery service."
)
@limiter.limit("5/minute")
async def submit_contact_form_alias(request: Request, contact: ContactRequest) -> JSONResponse:
    """
    Root alias (`POST /contact`) backward compatibility endpoint with rate limiting.
    """
    return await _process_contact_submission(request, contact)
