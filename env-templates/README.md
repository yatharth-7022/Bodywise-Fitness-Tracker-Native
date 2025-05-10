# Environment Configuration

This directory contains template files for setting up environment variables for both frontend and backend.

## Backend Setup

1. Copy the template to your server directory:
```bash
cp server.env.template ../server/.env
```

2. Edit the `.env` file in the server directory:
   - Set your database connection string
   - Create strong random strings for JWT_SECRET and REFRESH_TOKEN_SECRET
   - Update ALLOWED_ORIGINS with your actual IP address (replace 192.168.1.15)

## Frontend Setup

For the frontend, you need to:

1. Get your local IP address by running:
```bash
hostname -I | awk '{print $1}'
```

2. Update the `LOCAL_IP` variable in `client/config.js` with your actual IP address

## USB Device Connection

When connecting a physical device via USB:

1. Make sure your server is running on your computer: `cd server && npm run dev`
2. In the client config.js, ensure the LOCAL_IP is set to your computer's IP address
3. Run `npx expo start` in the client directory
4. Connect your device via USB and choose "Run on Android device/emulator" or "Run on iOS device"

## Production Deployment

1. For production backend, copy the production template:
```bash
cp production-server.env.template ../server/.env
```

2. Update with your actual production database URL and strong secrets

3. In client/config.js, update the PRODUCTION_API_URL with your actual deployed backend URL 