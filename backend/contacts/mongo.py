import os
from functools import lru_cache

from pymongo import MongoClient


@lru_cache(maxsize=1)
def get_mongo_client() -> MongoClient:
    uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
    return MongoClient(uri)


def get_contact_collection():
    database_name = os.getenv("MONGODB_DB_NAME", "kode_insignia")
    client = get_mongo_client()
    return client[database_name]["contact_submissions"]
