"""
Utility and helper functions for request extraction, sanitization, and formatting.
"""

from __future__ import annotations

import html

from fastapi import Request

from app.logger import logger


def get_client_ip(request: Request) -> str:
    """
    Extracts the true client IP address from the request object.

    Checks standard reverse-proxy headers (X-Forwarded-For, X-Real-IP) before
    falling back to the direct client socket host. If multiple IPs exist in
    X-Forwarded-For, returns only the first IP trimmed of whitespace.

    Args:
        request (Request): The incoming FastAPI HTTP request object.

    Returns:
        str: The extracted real client IP address, or "Unknown" if not determinable.
    """
    try:
        if not request or not hasattr(request, "headers"):
            return "Unknown"

        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded and forwarded.strip():
            return forwarded.split(",")[0].strip()

        real_ip = request.headers.get("X-Real-IP")
        if real_ip and real_ip.strip():
            return real_ip.strip()

        if request.client and request.client.host and request.client.host.strip():
            return request.client.host.strip()

        return "Unknown"
    except Exception as exc:
        logger.exception("Unexpected error extracting client IP address: {}", exc)
        return "Unknown"


def get_user_agent(request: Request) -> str:
    """
    Extracts the User-Agent header string from the request object safely.

    Args:
        request (Request): The incoming FastAPI HTTP request object.

    Returns:
        str: The User-Agent header value, or "Unknown" if missing or invalid.
    """
    try:
        if not request or not hasattr(request, "headers"):
            return "Unknown"

        user_agent = request.headers.get("user-agent")
        if user_agent and user_agent.strip():
            return user_agent.strip()

        return "Unknown"
    except Exception as exc:
        logger.exception("Unexpected error extracting User-Agent header: {}", exc)
        return "Unknown"


def sanitize_email_header(value: str | None) -> str:
    """
    Sanitizes string inputs intended for email headers (such as Subject or Reply-To)
    by removing carriage return (`\\r`) and newline (`\\n`) characters.

    This completely prevents Email Header Injection vulnerabilities and safely
    accepts None, empty strings, and normal strings.

    Args:
        value (str | None): The raw header value to sanitize.

    Returns:
        str: The sanitized header string without newline characters.
    """
    try:
        if not value:
            return ""

        return value.replace("\r", " ").replace("\n", " ").strip()
    except Exception as exc:
        logger.exception("Unexpected error sanitizing email header value: {}", exc)
        return ""


def escape_html_body(value: str | None) -> str:
    """
    Escapes HTML entities inside a string to prevent XSS injection within HTML email
    templates and converts standard newlines (`\\n`) to `<br>` tags for rich text.

    Safely handles None, empty string inputs, and unexpected types without crashing.

    Args:
        value (str | None): The raw message body or text content.

    Returns:
        str: The HTML-escaped string with `<br>` line breaks.
    """
    try:
        if not value:
            return ""

        escaped = html.escape(str(value))
        return escaped.replace("\n", "<br>")
    except Exception as exc:
        logger.exception("Unexpected error escaping HTML body value: {}", exc)
        return ""
