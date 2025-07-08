"use server";
import nodemailer from "nodemailer";

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILP,
  },
});

export async function subscribeToNewsletter(email) {
  try {
    // Validate email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Please provide a valid email address",
      };
    }

    // Send confirmation email to subscriber
    const subscriberMailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: "Welcome to Nina Healthy Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">
              Welcome to Nina Healthy! 🌟
            </h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to our newsletter! We're excited to have you join our community.
            </p>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              You'll receive:
            </p>
            
            <ul style="color: #666; font-size: 16px; line-height: 1.6; margin-left: 20px;">
              <li>Design tips and inspiration</li>
              <li>Exclusive updates and content</li>
              <li>Health and wellness insights</li>
              <li>Special offers and promotions</li>
            </ul>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888; font-size: 14px;">
                If you didn't subscribe to this newsletter, please ignore this email.
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                © 2024 Nina Healthy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.MAIL,
      to: process.env.MAILR,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h3 style="color: #333;">New Newsletter Subscription</h3>
          <p style="color: #666; font-size: 16px;">
            A new user has subscribed to the newsletter:
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #333; font-weight: bold;">
              Email: ${email}
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
              Subscribed on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(subscriberMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      error: "Failed to subscribe. Please try again later.",
    };
  }
}
