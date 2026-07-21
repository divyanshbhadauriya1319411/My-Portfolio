from unittest.mock import AsyncMock, patch
from fastapi.testclient import TestClient

from app.exceptions import EmailSendError, RecaptchaVerificationError
from app.main import app

client = TestClient(app)


def test_root_status_endpoint():
    """Verify that GET / returns exact running status JSON."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "running"}


def test_health_check_endpoint():
    """Verify that GET /health returns exact health check success JSON."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"success": True}


def test_contact_submission_validation_failure():
    """Verify that empty fields are rejected with 422 JSON response."""
    payload = {
        "name": "   ",  # Whitespace only should fail
        "email": "invalid-email",
        "subject": "",
        "message": "",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert "Validation failed" in data["message"]
    assert "errors" in data


@patch("app.routes.verify_recaptcha_token", new_callable=AsyncMock)
def test_contact_submission_recaptcha_failure(mock_verify):
    """Verify that failed reCAPTCHA verification returns HTTP 403 structured JSON response when token provided."""
    mock_verify.side_effect = RecaptchaVerificationError(
        "Google reCAPTCHA score too low."
    )

    payload = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Inquiry",
        "message": "Hello there!",
        "recaptchaToken": "fake-token",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 403
    data = response.json()
    assert data["success"] is False
    assert "Security check failed" in data["message"]
    mock_verify.assert_called_once()


@patch("app.routes.send_contact_email", new_callable=AsyncMock)
def test_contact_submission_success_without_token(mock_send):
    """Verify that valid submission without optional reCAPTCHA token sends email and returns 200 success JSON."""
    mock_send.return_value = {"id": "resend_12345"}

    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "subject": "Project Collaboration",
        "message": "Hi, I would like to discuss a project with you!",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["message"] == "Email sent successfully"
    mock_send.assert_called_once()


@patch("app.routes.send_contact_email", new_callable=AsyncMock)
@patch("app.routes.verify_recaptcha_token", new_callable=AsyncMock)
def test_contact_submission_resend_error(mock_verify, mock_send):
    """Verify that Resend API failure returns HTTP 500 structured JSON response."""
    mock_verify.return_value = True
    mock_send.side_effect = EmailSendError("Resend API rate limit exceeded.")

    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "subject": "Project Collaboration",
        "message": "Hi, I would like to discuss a project with you!",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 500
    data = response.json()
    assert data["success"] is False
    assert data["message"] == "Unable to send email"


@patch("app.routes.send_contact_email", new_callable=AsyncMock)
def test_contact_submission_exact_requirement_payload(mock_send):
    """Verify exact payload requested in requirements returns HTTP 200 and success."""
    mock_send.return_value = {"id": "resend_test_exact"}

    payload = {
        "name": "Divyansh",
        "email": "test@gmail.com",
        "subject": "Testing",
        "message": "Hello",
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["message"] == "Email sent successfully"
    mock_send.assert_called_once()
