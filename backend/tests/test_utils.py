from unittest.mock import MagicMock
from app.utils import (
    escape_html_body,
    get_client_ip,
    get_user_agent,
    sanitize_email_header,
)


def test_get_client_ip_x_forwarded_for_single():
    request = MagicMock()
    request.headers.get.side_effect = lambda key, default=None: (
        "203.0.113.195" if key.lower() == "x-forwarded-for" else default
    )
    assert get_client_ip(request) == "203.0.113.195"


def test_get_client_ip_x_forwarded_for_multiple():
    request = MagicMock()
    request.headers.get.side_effect = lambda key, default=None: (
        "203.0.113.195, 70.41.3.18, 150.172.238.178"
        if key.lower() == "x-forwarded-for"
        else default
    )
    assert get_client_ip(request) == "203.0.113.195"


def test_get_client_ip_x_real_ip():
    request = MagicMock()

    def get_header(key, default=None):
        if key.lower() == "x-real-ip":
            return "198.51.100.42"
        return default

    request.headers.get.side_effect = get_header
    assert get_client_ip(request) == "198.51.100.42"


def test_get_client_ip_fallback_to_client_host():
    request = MagicMock()
    request.headers.get.return_value = None
    request.client.host = "192.0.2.1"
    assert get_client_ip(request) == "192.0.2.1"


def test_get_client_ip_unknown():
    request = MagicMock()
    request.headers.get.return_value = None
    request.client = None
    assert get_client_ip(request) == "Unknown"


def test_get_user_agent_present():
    request = MagicMock()
    request.headers.get.return_value = "Mozilla/5.0 (Test Browser)"
    assert get_user_agent(request) == "Mozilla/5.0 (Test Browser)"


def test_get_user_agent_missing():
    request = MagicMock()
    request.headers.get.return_value = None
    assert get_user_agent(request) == "Unknown"


def test_sanitize_email_header_none():
    assert sanitize_email_header(None) == ""


def test_sanitize_email_header_empty():
    assert sanitize_email_header("") == ""


def test_sanitize_email_header_normal():
    assert sanitize_email_header("John Doe") == "John Doe"


def test_sanitize_email_header_injection():
    assert (
        sanitize_email_header("Subject\r\nBcc: hacker@example.com")
        == "Subject  Bcc: hacker@example.com"
    )


def test_escape_html_body_none():
    assert escape_html_body(None) == ""


def test_escape_html_body_empty():
    assert escape_html_body("") == ""


def test_escape_html_body_injection_and_newlines():
    raw = "<script>alert('xss')</script>\nLine 2\nLine 3"
    expected = "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;<br>Line 2<br>Line 3"
    assert escape_html_body(raw) == expected
