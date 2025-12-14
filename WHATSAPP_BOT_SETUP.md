# WhatsApp Bot Setup Guide

## Overview

The WhatsApp bot agent allows users to interact with your website through WhatsApp, collecting their information (name, email, message) and forwarding it to your email.

## Prerequisites

1. **Twilio Account** (for WhatsApp Business API)
   - Sign up at [Twilio](https://www.twilio.com/)
   - Get a Twilio phone number with WhatsApp capabilities
   - Obtain your Account SID and Auth Token

2. **WhatsApp Business Account** (optional but recommended)
   - For production use, you'll need a verified WhatsApp Business account

## Setup Instructions

### 1. Get Twilio Credentials

1. Go to [Twilio Console](https://console.twilio.com/)
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Get a Twilio phone number with WhatsApp enabled (format: `+14155238886`)

### 2. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

### 3. Set Up Webhook URL

1. In Twilio Console, go to **Phone Numbers** → **Manage** → **Active Numbers**
2. Click on your WhatsApp-enabled number
3. Under **Messaging Configuration**, set:
   - **A MESSAGE COMES IN**: `https://yourdomain.com/api/whatsapp/webhook`
   - Method: `POST`

### 4. Test the Bot

1. Send a WhatsApp message to your Twilio number
2. The bot will respond with a greeting
3. Follow the conversation flow:
   - Bot asks for name
   - Bot asks for email
   - Bot asks for message
   - Bot confirms and sends email notification

## Bot Conversation Flow

```
User: Hi / Hello / Start
Bot: 👋 Hello! I'm the Codex Neural assistant...
     What's your name?

User: [Name]
Bot: Nice to meet you, [Name]!
     What's your email address?

User: [Email]
Bot: Great! How can we help you?
     Please share your message or inquiry.

User: [Message]
Bot: ✅ Thank you! Your information has been received.
     Our team will get back to you soon.
```

## Features

- **Conversation State Management**: Tracks user progress through the form
- **Email Integration**: Automatically sends collected information to your email
- **Error Handling**: Validates email format and handles errors gracefully
- **Restart Capability**: Users can start a new conversation anytime

## API Endpoints

### POST `/api/whatsapp/webhook`
- Receives incoming WhatsApp messages from Twilio
- Processes conversation and sends responses
- Returns TwiML response

### POST `/api/whatsapp/send`
- Allows you to send WhatsApp messages programmatically
- Requires: `to` (phone number) and `message` (text)

## Production Considerations

1. **Database Storage**: Replace in-memory `conversations` Map with a database (Redis, PostgreSQL, etc.)
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Webhook Security**: Verify Twilio webhook signatures
4. **Error Logging**: Set up proper error logging and monitoring
5. **WhatsApp Business API**: For production, use official WhatsApp Business API instead of Twilio sandbox

## Twilio Sandbox (Testing)

For testing, Twilio provides a sandbox number. To use it:

1. Send a message to the sandbox number with the join code
2. Example: Send "join [code]" to `+1 415 523 8886`
3. Once joined, you can test the bot

## Troubleshooting

- **"Twilio client not initialized"**: Check that all Twilio env variables are set
- **Messages not received**: Verify webhook URL is correct and accessible
- **Bot not responding**: Check server logs for errors
- **Email not sent**: Ensure email configuration is also set up correctly

## Alternative: WhatsApp Business API

For production, consider using the official WhatsApp Business API:
- More reliable and scalable
- Better message delivery rates
- Official WhatsApp Business features
- Requires business verification


