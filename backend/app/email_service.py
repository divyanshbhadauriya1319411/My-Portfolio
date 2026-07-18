import asyncio
import html
from datetime import datetime, timezone
from typing import Any, Dict
import resend

from app.config import settings
from app.exceptions import EmailSendError
from app.logger import log_email_failure, logger
from app.schemas import ContactRequest
from app.utils import escape_html_body, sanitize_email_header

# Initialize Resend API key
resend.api_key = settings.RESEND_API_KEY


async def send_contact_email(
    contact: ContactRequest,
    client_ip: str = "Unknown",
    user_agent: str = "Unknown"
) -> Dict[str, Any]:
    """
    Sends a professional HTML email notification via Resend API using non-blocking thread execution.
    Sanitizes email headers against injection attacks and escapes HTML content against XSS.
    """
    resend.api_key = settings.RESEND_API_KEY

    if not settings.RESEND_API_KEY:
        error_msg = "Resend API key is missing from server environment."
        log_email_failure(contact.email, error_msg)
        raise EmailSendError(error_msg)

    if not settings.TO_EMAIL:
        error_msg = "Destination TO_EMAIL is missing from server environment."
        log_email_failure(contact.email, error_msg)
        raise EmailSendError(error_msg)

    # Sanitize header fields to completely prevent Email Header Injection (\r, \n removal)
    clean_name = sanitize_email_header(contact.name)
    clean_email = sanitize_email_header(contact.email)
    clean_subject = sanitize_email_header(contact.subject)

    # Format current UTC date and time
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    # Escape HTML elements for safe presentation
    safe_name = html.escape(clean_name)
    safe_email = html.escape(clean_email)
    safe_subject = html.escape(clean_subject)
    safe_message = escape_html_body(contact.message)
    safe_ip = html.escape(client_ip)
    safe_user_agent = html.escape(user_agent)

    # Construct clean, professional HTML email body
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f8fafc;
                margin: 0;
                padding: 20px;
            }}
            .email-container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }}
            .email-header {{
                background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                color: #ffffff;
                padding: 24px;
                text-align: center;
            }}
            .email-header h2 {{
                margin: 0;
                font-size: 20px;
                font-weight: 600;
            }}
            .email-body {{
                padding: 24px;
            }}
            .field-row {{
                margin-bottom: 16px;
                border-bottom: 1px solid #f1f5f9;
                padding-bottom: 12px;
            }}
            .field-label {{
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                color: #64748b;
                margin-bottom: 4px;
            }}
            .field-value {{
                font-size: 15px;
                color: #1e293b;
            }}
            .message-box {{
                background-color: #f8fafc;
                border-left: 4px solid #3b82f6;
                padding: 16px;
                border-radius: 4px;
                margin-top: 8px;
                font-size: 15px;
                color: #1e293b;
                white-space: pre-wrap;
            }}
            .metadata-section {{
                margin-top: 24px;
                background-color: #f1f5f9;
                padding: 16px;
                border-radius: 6px;
                border: 1px solid #e2e8f0;
            }}
            .metadata-row {{
                font-size: 13px;
                color: #475569;
                margin-bottom: 6px;
            }}
            .metadata-row strong {{
                color: #1e293b;
            }}
            .email-footer {{
                background-color: #e2e8f0;
                padding: 16px 24px;
                font-size: 12px;
                color: #64748b;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h2>New Portfolio Contact</h2>
            </div>
            <div class="email-body">
                <div class="field-row">
                    <div class="field-label">Name</div>
                    <div class="field-value">{safe_name}</div>
                </div>
                <div class="field-row">
                    <div class="field-label">Email</div>
                    <div class="field-value"><a href="mailto:{safe_email}">{safe_email}</a></div>
                </div>
                <div class="field-row">
                    <div class="field-label">Subject</div>
                    <div class="field-value">{safe_subject}</div>
                </div>
                <div class="field-row">
                    <div class="field-label">Message</div>
                    <div class="message-box">{safe_message}</div>
                </div>
                <div class="metadata-section">
                    <div class="metadata-row"><strong>Date:</strong> {timestamp}</div>
                    <div class="metadata-row"><strong>Browser:</strong> {safe_user_agent}</div>
                    <div class="metadata-row"><strong>IP Address:</strong> {safe_ip}</div>
                </div>
            </div>
            <div class="email-footer">
                Submitted via Portfolio Website Security & Notification System
            </div>
        </div>
    </body>
    </html>
    """

    params: resend.Emails.SendParams = {
        "from": settings.FROM_EMAIL,
        "to": [settings.TO_EMAIL],
        "subject": "New Portfolio Contact",
        "html": html_content,
        "reply_to": clean_email,
    }

    try:
        logger.info("Resend request initiated: from={}, to={}, subject={}, reply_to={}", settings.FROM_EMAIL, settings.TO_EMAIL, params["subject"], clean_email)
        # Execute Resend SDK call synchronously in a dedicated thread
        response = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Resend response received: {}", response)
        logger.info("Resend API successfully delivered contact notification: {}", response)
        return response
    except Exception as exc:
        logger.exception("Exceptions & Stack trace during Resend send: {}", exc)
        log_email_failure(clean_email, str(exc))
        raise EmailSendError(f"Unable to send email: {exc}") from exc
