import { NextRequest, NextResponse } from "next/server";
import { Twilio } from "twilio";

// Initialize Twilio client
const getTwilioClient = () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (!accountSid || !authToken) {
        return null;
    }
    
    return new Twilio(accountSid, authToken);
};

// Bot conversation state management (in production, use a database)
interface ConversationState {
    step: 'greeting' | 'name' | 'email' | 'message' | 'complete';
    data: {
        name?: string;
        email?: string;
        message?: string;
    };
}

// In-memory store (use Redis or database in production)
const conversations = new Map<string, ConversationState>();

// Send WhatsApp message
async function sendWhatsAppMessage(to: string, message: string) {
    const client = getTwilioClient();
    if (!client) {
        console.error("Twilio client not initialized");
        return;
    }

    const from = process.env.TWILIO_WHATSAPP_NUMBER;
    if (!from) {
        console.error("WhatsApp number not configured");
        return;
    }

    try {
        await client.messages.create({
            from: `whatsapp:${from}`,
            to: `whatsapp:${to}`,
            body: message,
        });
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
    }
}

// Send email notification
async function sendEmailNotification(data: { name: string; email: string; message: string; phone: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.ok;
}

// Bot conversation handler
function handleConversation(phoneNumber: string, incomingMessage: string): string {
    const state = conversations.get(phoneNumber) || {
        step: 'greeting' as const,
        data: {},
    };

    const message = incomingMessage.toLowerCase().trim();

    switch (state.step) {
        case 'greeting':
            conversations.set(phoneNumber, { step: 'name', data: {} });
            return "👋 Hello! I'm the Codex Neural assistant. I'd like to help you get in touch with us.\n\nWhat's your name?";

        case 'name':
            conversations.set(phoneNumber, {
                step: 'email',
                data: { name: incomingMessage },
            });
            return `Nice to meet you, ${incomingMessage}! 📧\n\nWhat's your email address?`;

        case 'email':
            // Basic email validation
            if (!incomingMessage.includes('@') || !incomingMessage.includes('.')) {
                return "Please provide a valid email address.";
            }
            conversations.set(phoneNumber, {
                step: 'message',
                data: { ...state.data, email: incomingMessage },
            });
            return "Great! 💬\n\nHow can we help you? Please share your message or inquiry.";

        case 'message':
            const completeData = {
                ...state.data,
                message: incomingMessage,
            };
            
            // Send email notification
            sendEmailNotification({
                name: completeData.name!,
                email: completeData.email!,
                message: completeData.message!,
                phone: phoneNumber,
            });

            conversations.set(phoneNumber, { step: 'complete', data: completeData });
            return "✅ Thank you! Your information has been received. Our team will get back to you soon.\n\nIs there anything else I can help you with? (Reply 'yes' to start over, or 'no' to end)";

        case 'complete':
            if (message === 'yes' || message === 'y') {
                conversations.set(phoneNumber, { step: 'name', data: {} });
                return "Great! Let's start over.\n\nWhat's your name?";
            } else {
                conversations.delete(phoneNumber);
                return "Thank you for contacting Codex Neural! Have a great day! 👋";
            }

        default:
            return "I'm not sure how to help with that. Please reply 'start' to begin a new conversation.";
    }
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const from = formData.get('From') as string;
        const body = formData.get('Body') as string;

        if (!from || !body) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Extract phone number (remove 'whatsapp:' prefix if present)
        const phoneNumber = from.replace('whatsapp:', '');

        // Handle special commands
        if (body.toLowerCase().trim() === 'start' || body.toLowerCase().trim() === 'hi' || body.toLowerCase().trim() === 'hello') {
            conversations.set(phoneNumber, { step: 'greeting', data: {} });
        }

        // Process conversation
        const responseMessage = handleConversation(phoneNumber, body);

        // Send response
        await sendWhatsAppMessage(phoneNumber, responseMessage);

        // Return TwiML response (for Twilio webhook)
        return new NextResponse(
            `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
            {
                status: 200,
                headers: { 'Content-Type': 'text/xml' },
            }
        );
    } catch (error) {
        console.error("WhatsApp webhook error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Handle GET requests (for webhook verification)
export async function GET(request: NextRequest) {
    return NextResponse.json({ 
        message: "WhatsApp webhook is active",
        timestamp: new Date().toISOString()
    });
}

