import html
from fastapi import Request


def get_client_ip(request: Request) -> str:
    """
    Extracts the true client IP address from the request object, handling proxy headers
    such as X-Forwarded-For commonly used by platforms like Render, Vercel, or Cloudflare.
    """
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # X-Forwarded-For can contain multiple IPs (client, proxy1, proxy2); first is client
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "Unknown"


def get_user_agent(request: Request) -> str:
    """
    Extracts the User-Agent header from the request object.
    """
    return request.headers.get("user-agent", "Unknown")


def sanitize_email_header(value: str) -> str:
    """
    Sanitizes string inputs intended for email headers (Subject, Name, Reply-To)
    by removing carriage return and newline characters (`\\r`, `\\n`).
    This completely prevents Email Header Injection vulnerabilities.
    """
    return value.replace("\r", " ").replace("\n", " ").strip()


def escape_html_body(value: str) -> str:
    """
    Escapes HTML entities inside a string to prevent XSS injection within HTML email templates
    and converts standard newlines to `<br>` tags for rich text formatting.
    """
    escaped = html.escape(value)
    return escaped.replace("\n", "<br>")
