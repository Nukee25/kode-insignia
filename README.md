# kode-insignia

Full React frontend with a Django backend API that stores contact emails in MongoDB.

## Project structure

- `/frontend` — React + Vite portfolio UI, including `/contact` route.
- `/backend` — Django REST API with `POST /api/contact/`.

## Frontend setup

```bash
cd /home/runner/work/kode-insignia/kode-insignia/frontend
npm install
npm run dev
```

Optional environment variable:

- `VITE_API_BASE_URL` (default: empty, uses Vite proxy)

## Backend setup

Install dependencies:

```bash
python -m pip install django djangorestframework pymongo django-cors-headers
```

Run server:

```bash
cd /home/runner/work/kode-insignia/kode-insignia/backend
python manage.py migrate
python manage.py runserver
```

Environment variables:

- `MONGODB_URI` (default: `mongodb://localhost:27017/`)
- `MONGODB_DB_NAME` (default: `kode_insignia`)
- `CORS_ALLOWED_ORIGINS` (default: `http://127.0.0.1:5173,http://localhost:5173`)
- `DJANGO_ALLOWED_HOSTS` (default: `127.0.0.1,localhost`)

## Tests

```bash
cd /home/runner/work/kode-insignia/kode-insignia/backend
python manage.py test contacts
```
