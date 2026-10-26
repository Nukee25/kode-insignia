from unittest.mock import MagicMock, patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class ContactSubmissionTests(APITestCase):
    @patch("contacts.views.get_contact_collection")
    def test_accepts_valid_email_and_persists(self, mock_get_collection):
        collection = MagicMock()
        mock_get_collection.return_value = collection

        response = self.client.post(
            reverse("contact-submission"),
            {"email": "hello@example.com"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        collection.insert_one.assert_called_once()

    @patch("contacts.views.get_contact_collection")
    def test_rejects_invalid_email(self, mock_get_collection):
        response = self.client.post(
            reverse("contact-submission"),
            {"email": "invalid-email"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        mock_get_collection.assert_not_called()
