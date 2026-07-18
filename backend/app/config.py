from functools import lru_cache
from typing import Any, List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration values read securely using python-dotenv via Pydantic BaseSettings.
    Ensures zero hardcoded secrets.
    """
    # Resend Email Configuration
    RESEND_API_KEY: str = Field(default="", description="Resend API Key for sending emails")
    FROM_EMAIL: str = Field(
        default="onboarding@resend.dev",
        description="Verified sender email address in Resend dashboard"
    )
    TO_EMAIL: str = Field(
        default="",
        description="Destination email address where contact submissions are received"
    )

    # Google reCAPTCHA Configuration
    RECAPTCHA_SECRET_KEY: str = Field(
        default="",
        description="Google reCAPTCHA Secret Key for verifying token authenticity"
    )
    RECAPTCHA_MIN_SCORE: float = Field(
        default=0.5,
        description="Minimum score threshold required for reCAPTCHA v3 (0.0 to 1.0)"
    )

    # CORS Configuration
    ALLOWED_ORIGINS: Union[List[str], str] = Field(
        default=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "https://divyanshbhadauriya-portfolio.vercel.app"],
        description="List of allowed CORS frontend origins"
    )

    # Environment setting
    ENVIRONMENT: str = Field(
        default="development",
        description="Deployment environment (development, staging, production)"
    )

    @classmethod
    def decode_complex_value(cls, field_name: str, field: Any, value: Any) -> Any:
        """
        Gracefully decode ALLOWED_ORIGINS whether passed as JSON or comma-separated string from .env.
        """
        if field_name == "ALLOWED_ORIGINS" and isinstance(value, str):
            try:
                import json
                return json.loads(value)
            except Exception:
                return [origin.strip() for origin in value.split(",") if origin.strip()]
        return super().decode_complex_value(field_name, field, value)

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        """
        Parses ALLOWED_ORIGINS whether passed as a comma-separated string in .env
        or as a raw Python list.
        """
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        if isinstance(v, list):
            return [str(origin).strip() for origin in v if str(origin).strip()]
        return ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "https://divyanshbhadauriya-portfolio.vercel.app"]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


@lru_cache()
def get_settings() -> Settings:
    """
    Returns cached instance of Settings to ensure environment variables are loaded efficiently.
    """
    return Settings()


settings = get_settings()
