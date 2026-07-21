from typing import Optional
import httpx
from fastapi import Request

from app.config import settings
from app.exceptions import RecaptchaVerificationError
from app.logger import logger

RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"


async def verify_recaptcha_token(token: str, remote_ip: Optional[str] = None) -> bool:
    """
    Verifies a Google reCAPTCHA v3 (or v2) token against Google's verification API.
    Enforces the minimum score threshold to stop automated spam bots before sending emails.
    """
    if not settings.RECAPTCHA_SECRET_KEY:
        logger.error("RECAPTCHA_SECRET_KEY is missing in server environment variables.")
        raise RecaptchaVerificationError(
            "Google reCAPTCHA secret key is not configured on the server."
        )

    payload = {
        "secret": settings.RECAPTCHA_SECRET_KEY,
        "response": token,
    }
    if remote_ip and remote_ip != "Unknown":
        payload["remoteip"] = remote_ip

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(RECAPTCHA_VERIFY_URL, data=payload)
            response.raise_for_status()
            result = response.json()
    except httpx.HTTPError as exc:
        logger.error(
            "HTTP network error communicating with Google reCAPTCHA server: {}", exc
        )
        raise RecaptchaVerificationError(
            "Unable to communicate with Google reCAPTCHA verification service."
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected error verifying reCAPTCHA token: {}", exc)
        raise RecaptchaVerificationError(
            "Error during reCAPTCHA verification."
        ) from exc

    success = result.get("success", False)
    score = result.get("score")  # Available in v3 responses
    error_codes = result.get("error-codes", [])

    if not success:
        logger.warning(
            "Google reCAPTCHA token verification rejected by API. Error codes: {}",
            error_codes,
        )
        raise RecaptchaVerificationError("Google reCAPTCHA verification failed.")

    # Check score threshold for reCAPTCHA v3
    if score is not None:
        if float(score) < settings.RECAPTCHA_MIN_SCORE:
            logger.warning(
                "Google reCAPTCHA score {} below required threshold {}",
                score,
                settings.RECAPTCHA_MIN_SCORE,
            )
            raise RecaptchaVerificationError(
                "Google reCAPTCHA score too low (suspected automated bot)."
            )

    logger.info("Google reCAPTCHA verification successful (Score: {})", score)
    return True


async def add_security_headers_middleware(request: Request, call_next):
    """
    FastAPI HTTP middleware to inject hardened security response headers protecting against
    MIME-sniffing, clickjacking, and XSS attacks.
    """
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = (
        "max-age=31536000; includeSubDomains"
    )
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response
