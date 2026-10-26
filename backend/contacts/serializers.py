from rest_framework import serializers


class ContactSubmissionSerializer(serializers.Serializer):
    email = serializers.EmailField()
