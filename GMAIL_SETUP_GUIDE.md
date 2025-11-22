# Gmail SMTP Setup Guide for Godrej Reserve

To enable auto-reply emails from `godrejreserve.org.in@gmail.com`, you need to configure the SMTP settings in your `.env.local` file.

## Step 1: Generate an App Password

Since you are using Gmail, you cannot use your regular password. You must generate an **App Password**.

1.  Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2.  Enable **2-Step Verification** if it is not already enabled.
3.  Search for **"App passwords"** in the search bar at the top (or look under "Signing in to Google").
4.  Create a new App Password:
    *   **App name**: `Godrej Website`
5.  Copy the 16-character password generated (e.g., `abcd efgh ijkl mnop`).

## Step 2: Update Environment Variables

Open your `.env.local` file in the project root and add (or update) the following lines:

```env
# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=godrejreserve.org.in@gmail.com
SMTP_PASS=dkxnieqqgdomorvs
SMTP_FROM=godrejreserve.org.in@gmail.com
```

## Step 3: Restart the Server

After saving the `.env.local` file, you must restart your development server for the changes to take effect.

1.  Stop the server (Ctrl+C).
2.  Run `npm run dev` again.

## Testing

1.  Fill out the "Contact" or "Schedule Visit" form on the website.
2.  Check the inbox of the email address you entered in the form.
3.  You should receive an auto-reply from `godrejreserve.org.in@gmail.com`.
