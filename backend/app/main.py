from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.exceptions import (
    EmailSendError,
    RecaptchaVerificationError,
    email_send_exception_handler,
    general_exception_handler,
    http_exception_handler,
    rate_limit_exception_handler,
    recaptcha_exception_handler,
    validation_exception_handler,
)
from app.logger import logger, setup_logger
from app.routes import limiter, router as api_router
from app.security import add_security_headers_middleware


def create_application() -> FastAPI:
    """
    Application factory initializing FastAPI, CORS, Loguru logger, SlowAPI limiter,
    security headers middleware, and custom structured JSON exception handlers.
    """
    # Initialize Loguru structured logging
    setup_logger()

    app = FastAPI(
        title="Portfolio Backend API",
        version="1.0.0",
        description="Production-ready FastAPI backend for Portfolio Website with Resend email notification and Google reCAPTCHA v3 verification.",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Attach SlowAPI Rate Limiter to app state
    app.state.limiter = limiter

    # Configure CORS Middleware using exact origins and methods
    logger.info("Configuring CORS ALLOWED_ORIGINS: {}", settings.ALLOWED_ORIGINS)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    # Register Security Headers HTTP Middleware
    app.middleware("http")(add_security_headers_middleware)

    # Register Global Structured JSON Exception Handlers
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(RecaptchaVerificationError, recaptcha_exception_handler)
    app.add_exception_handler(EmailSendError, email_send_exception_handler)
    app.add_exception_handler(RateLimitExceeded, rate_limit_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)

    # Include API Routes
    app.include_router(api_router)

    return app


app = create_application()
