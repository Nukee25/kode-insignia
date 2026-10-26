from datetime import datetime, timezone

from pymongo.errors import PyMongoError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .mongo import get_contact_collection
from .serializers import ContactSubmissionSerializer


class ContactSubmissionView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ContactSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            collection = get_contact_collection()
            collection.insert_one(
                {
                    "email": serializer.validated_data["email"],
                    "submitted_at": datetime.now(timezone.utc),
                }
            )
        except PyMongoError:
            return Response(
                {"detail": "Unable to save your request right now."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response(
            {"detail": "Contact email saved successfully."},
            status=status.HTTP_201_CREATED,
        )
