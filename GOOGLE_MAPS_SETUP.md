# Google Maps API Setup Instructions

## 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API** (optional, for future address-to-coordinates conversion)

4. Go to "Credentials" and create a new API key
5. Restrict the API key to your domain for security

## 2. Add the API Key to Your Project

Create a `.env` file in the root directory of your React app and add:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the API key you obtained from Google Cloud Console.

## 3. Restart the Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## 4. Test the Map

1. Log in to your account
2. Navigate to the "Map" page using the navigation bar
3. You should see an interactive Google Map with product markers

## Demo Mode

If you don't have a Google Maps API key yet, the application will still work but the map won't load. The sidebar functionality and all other features will work normally.

## Security Note

- Never commit your actual API key to version control
- Use environment variables to store sensitive information
- Restrict your API key to specific domains in production
- Monitor your API usage in Google Cloud Console


