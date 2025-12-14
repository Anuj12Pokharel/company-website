# Email Setup Guide

## Gmail Configuration

To receive contact form submissions in your Gmail account, follow these steps:

### 1. Create a Gmail App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Go to **App Passwords** (you may need to search for it)
4. Select **Mail** as the app and **Other (Custom name)** as the device
5. Enter "Codex Neural Contact Form" as the name
6. Click **Generate**
7. Copy the 16-character password (you'll use this in your `.env.local` file)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
CONTACT_EMAIL=your-email@gmail.com
```

**Important:**
- `SMTP_USER`: Your Gmail address
- `SMTP_PASSWORD`: The 16-character App Password (NOT your regular Gmail password)
- `CONTACT_EMAIL`: The email address where you want to receive contact form submissions (can be the same as SMTP_USER)

### 3. Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

### 4. Test the Contact Form

1. Navigate to `http://localhost:3000/contact`
2. Fill out the form and submit
3. Check your Gmail inbox for the new message

## Troubleshooting

- **"Email service not configured"**: Make sure all SMTP variables are set in `.env.local`
- **"Authentication failed"**: Verify you're using the App Password, not your regular Gmail password
- **"Connection timeout"**: Check your firewall/network settings for port 587
- **Not receiving emails**: Check spam folder and verify `CONTACT_EMAIL` is correct

## Alternative Email Services

If you prefer not to use Gmail, you can use other SMTP services:

- **SendGrid**: `smtp.sendgrid.net` (port 587)
- **Mailgun**: `smtp.mailgun.org` (port 587)
- **Outlook/Hotmail**: `smtp-mail.outlook.com` (port 587)

Just update the `SMTP_HOST` and `SMTP_PORT` in your `.env.local` file accordingly.


