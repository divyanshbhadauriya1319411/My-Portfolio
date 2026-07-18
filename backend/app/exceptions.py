from typing import Any, Dict, List
from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from starlette.exceptions import HTTPException as StarletteHTTPException


class ConfigurationError(Exception):
    """Raised when critical configuration values or API keys are missing."""
    pass


class EmailSendError(Exception):
    """Raised when sending an email via Resend fails."""
    pass


class RecaptchaVerificationError(Exception):
    """Raised when Google reCAPTCHA verification fails or score is below threshold."""
    pass


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """
    Handles Pydantic validation failures (empty fields, malformed email, large payload).
    Returns structured JSON error response.
    """
    from app.logger import log_validation_error, logger
    logger.info("Incoming Request")
    logger.info("Validation")
    logger.error("Failure")
    errors = exc.errors()
    log_validation_error(request.url.path, errors)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "message": "Validation failed. Please verify your form inputs.",
            "errors": errors
        }
    )


async def recaptcha_exception_handler(request: Request, exc: RecaptchaVerificationError) -> JSONResponse:
    """
    Handles Google reCAPTCHA verification failures.
    Returns HTTP 403 Forbidden with exact structured JSON.
    """
    from app.logger import log_recaptcha_failure, logger
    logger.error("Failure")
    client_ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else "Unknown").split(",")[0].strip()
    log_recaptcha_failure(client_ip, str(exc))
    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN,
        content={
            "success": False,
            "message": "Security check failed: Google reCAPTCHA verification failed."
        }
    )


async def email_send_exception_handler(request: Request, exc: EmailSendError) -> JSONResponse:
    """
    Handles Resend API email delivery failures.
    Returns HTTP 500 with exact JSON: {"success": false, "message": "Unable to send email"}.
    """
    from app.logger import log_email_failure, logger
    logger.error("Failure")
    log_email_failure("Recipient", str(exc))
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "message": "Unable to send email"
        }
    )


async def rate_limit_exception_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    """
    Handles SlowAPI rate limiting violations (exceeding 5 requests/minute).
    Returns HTTP 429 structured JSON.
    """
    from app.logger import logger
    client_ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else "Unknown").split(",")[0].strip()
    logger.warning("Rate limit exceeded for IP %s on %s", client_ip, request.url.path)
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={
            "success": False,
            "message": "Too many requests. Please wait before submitting again."
        }
    )


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    """
    Handles standard Starlette/FastAPI HTTP exceptions.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": str(exc.detail)
        }
    )


async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Handles any unhandled unexpected runtime exceptions securely without leaking internal stack traces.
    """
    from app.logger import log_unexpected_exception, logger
    logger.error("Failure")
    log_unexpected_exception(exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "message": "Internal server error."
        }
    )
