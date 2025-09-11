# Tetibola backend documentation

## Structure

apps/server/
├─ controllers/ # Handles API logic for routes
├─ routes/ # Express routes
├─ models/ # Database models (PostgreSQL)
├─ index.js # Express app initialization
├─ package.json
└─ .env

## Configuration

1. Create a .env file in apps/server/ with your environment variables:

```.env
HOST=localhost
PGUSER=your_postgres_user
PASSWORD=your_postgres_password
DATABASE=your_database_name
PORT=8080

MAIL_USERNAME=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_specific_password
JWT_SECRET=your_jwt_secret
```

2. Gmail setup for sending emails:

- You need to generate an App Password (not your regular Gmail password) for secure access:

    - Go to Google Account Security Settings

    - Enable 2-Step Verification.

    - Under “App passwords”, create a new password for “Mail” → “Other (Custom name)”.

    - Copy this password and put it in GMAIL_APP_PASSWORD in your .env.

⚠️ Do not use your regular Gmail password here. App passwords are required for third-party apps like this Node.js
server.

3. JWT Secret:

Set a strong secret string for JWT_SECRET.

## Routes

- Main URL: http://localhost:8080/api
- /expenses
- /incomes
- /auth
    - /signup
        - /
        - /verification
    - /login
        - /
        - /verification
- 