import sys
from typing import Any, List
from loguru import logger


def setup_logger() -> None:
    """
    Configures Loguru logger with structured console formatting.
    Ensures proper log rotation and prevents sensitive API key leaks.
    """
    logger.remove()  # Remove default handler
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss UTC}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        level="INFO",
        colorize=True,
    )
    logger.info("Structured Loguru logging initialized successfully.")


def _mask_sensitive_data(text: str) -> str:
    """
    Utility function to scrub any accidental inclusion of secrets from log messages.
    """
    from app.config import settings

    if settings.RESEND_API_KEY and len(settings.RESEND_API_KEY) > 8:
        text = text.replace(settings.RESEND_API_KEY, "[MASKED_RESEND_KEY]")
    if settings.RECAPTCHA_SECRET_KEY and len(settings.RECAPTCHA_SECRET_KEY) > 8:
        text = text.replace(settings.RECAPTCHA_SECRET_KEY, "[MASKED_RECAPTCHA_KEY]")
    return text


def log_request_success(ip: str, email: str) -> None:
    """
    Logs successful contact form submissions.
    """
    logger.info(
        "Successful contact form submission delivered from IP: {} | Email: {}",
        ip,
        _mask_sensitive_data(email),
    )


def log_validation_error(path: str, errors: List[Any]) -> None:
    """
    Logs form validation failures without exposing sensitive payload details.
    """
    logger.warning(
        "Validation error on request path {}: {}",
        path,
        _mask_sensitive_data(str(errors)),
    )


def log_recaptcha_failure(ip: str, reason: str) -> None:
    """
    Logs failed or low-score Google reCAPTCHA verification attempts.
    """
    logger.warning(
        "Google reCAPTCHA verification rejected for IP {}: {}",
        ip,
        _mask_sensitive_data(reason),
    )


def log_email_failure(email: str, error: str) -> None:
    """
    Logs Resend API email delivery failures.
    """
    logger.error(
        "Resend API failed to deliver contact email for {}: {}",
        _mask_sensitive_data(email),
        _mask_sensitive_data(error),
    )


def log_unexpected_exception(exc: Exception) -> None:
    """
    Logs unexpected system exceptions securely.
    """
    logger.exception(
        "Unexpected exception caught by global handler: {}",
        _mask_sensitive_data(str(exc)),
    )
