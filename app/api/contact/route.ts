import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
    phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate input
        const validatedData = contactSchema.parse(body);
        
        // Get email configuration from environment variables
        const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
        const smtpPort = parseInt(process.env.SMTP_PORT || "587");
        const smtpUser = process.env.SMTP_USER;
        const smtpPassword = process.env.SMTP_PASSWORD;
        const recipientEmail = process.env.CONTACT_EMAIL || smtpUser;

        if (!smtpUser || !smtpPassword) {
            console.error("SMTP credentials not configured");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPassword,
            },
        });

        // Email content
        const mailOptions = {
            from: `"Codex Neural Contact Form" <${smtpUser}>`,
            to: recipientEmail,
            replyTo: validatedData.email,
            subject: `New Contact Form Submission from ${validatedData.name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
                        .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
                        .value { margin-top: 5px; color: #000; }
                        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Form Submission</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">Name / Organization</div>
                                <div class="value">${validatedData.name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email</div>
                                <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                            </div>
                            <div class="field">
                                <div class="label">Message</div>
                                <div class="value">${validatedData.message.replace(/\n/g, '<br>')}</div>
                            </div>
                            ${validatedData.phone ? `
                            <div class="field">
                                <div class="label">Phone</div>
                                <div class="value">${validatedData.phone}</div>
                            </div>
                            ` : ''}
                        </div>
                        <div class="footer">
                            <p>This email was sent from the Codex Neural contact form.</p>
                            <p>You can reply directly to this email to respond to ${validatedData.name}.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
${validatedData.phone ? `\nPhone: ${validatedData.phone}` : ''}

---
This email was sent from the Codex Neural contact form.
You can reply directly to this email to respond to ${validatedData.name}.
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid form data", details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}

