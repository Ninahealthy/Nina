"use server";
import nodemailer from "nodemailer";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(formData) {
  try {
    const { name: rawName, email, subject: rawSubject, message: rawMessage } = formData;
    const name = escapeHtml(rawName);
    const subject = rawSubject ? escapeHtml(rawSubject) : "";
    const message = escapeHtml(rawMessage);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILP,
      },
    });

    // Email content for admin notification
    const adminMailOptions = {
      from: process.env.MAIL,
      to: process.env.MAILR,
      subject: `New Contact Form Message: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #C07A56 0%, #8FA98B 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 24px;">New Contact Form Message</h2>
          </div>

          <div style="background: #FAF7F2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #3D3832; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "No subject provided"}</p>
          </div>

          <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #C07A56;">
            <h3 style="color: #3D3832; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #6B6560;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #F3EDE4; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #6B6560;">
              This message was sent from your website contact form on ${new Date().toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}.
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply email to the user
    const userMailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: "Thank you for your message!",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #C07A56 0%, #8FA98B 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 24px;">Thank You for Your Message</h2>
          </div>

          <div style="background: #FAF7F2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #3D3832; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            <p style="color: #6B6560; line-height: 1.6;">
              Thank you for reaching out. I have received your message and will get back to you as soon as possible, usually within 24-48 hours.
            </p>
          </div>

          <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #C07A56; margin-bottom: 20px;">
            <h3 style="color: #3D3832; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject || "No subject provided"}</p>
            <p><strong>Message:</strong></p>
            <p style="color: #6B6560; line-height: 1.6; font-style: italic;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>

          <div style="background: #F3EDE4; padding: 20px; border-radius: 8px;">
            <p style="margin: 0; color: #6B6560; font-size: 14px;">
              With warmth,<br>
              Nina
            </p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);

    return {
      success: false,
      error:
        "Sorry, there was an error sending your message. Please try again later.",
    };
  }
}
