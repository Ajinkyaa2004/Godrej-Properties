# Google Analytics Setup Guide

To track website traffic and user behavior, you need to set up Google Analytics 4 (GA4).

## Step 1: Create a Google Analytics Account

1.  Go to [analytics.google.com](https://analytics.google.com/).
2.  Log in with your Google account.
3.  Click **Start measuring**.
4.  **Account Name**: Enter "Godrej Reserve" (or your preferred name).
5.  Click **Next**.

## Step 2: Create a Property

1.  **Property Name**: Enter "Godrej Reserve Website".
2.  **Reporting Time Zone**: Select "India".
3.  **Currency**: Select "Indian Rupee (INR)".
4.  Click **Next**.
5.  Select your industry (Real Estate) and business size.
6.  Click **Next** and select your business objectives (e.g., "Generate leads").
7.  Click **Create** and accept the terms.

## Step 3: Set up a Data Stream

1.  Choose **Web** as the platform.
2.  **Website URL**: Enter your domain (e.g., `godrejreserve.org.in`) or `localhost` for testing.
3.  **Stream Name**: Enter "Godrej Reserve Web".
4.  Click **Create stream**.

## Step 4: Get Your Measurement ID

1.  On the "Web stream details" page, you will see a **Measurement ID** in the top right corner.
2.  It looks like `G-XXXXXXXXXX`.
3.  **Copy this ID.**

## Step 5: Add to Environment Variables

1.  Open your `.env.local` file in the project folder.
2.  Add the following line:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

(Replace `G-XXXXXXXXXX` with your actual ID).

## Step 6: Add to Vercel (For Live Site)

1.  Go to your Vercel Dashboard.
2.  Go to **Settings** > **Environment Variables**.
3.  Add a new variable:
    *   **Key**: `NEXT_PUBLIC_GA_ID`
    *   **Value**: Your Measurement ID (e.g., `G-XXXXXXXXXX`)
4.  **Redeploy** your project for changes to take effect.

## Verification

1.  Run your website locally (`npm run dev`).
2.  Go to your Google Analytics Realtime report.
3.  Visit your website.
4.  You should see 1 user active in the Realtime report within a minute.
