"use server";
import nodemailer from "nodemailer";
import { escapeHtml } from "../../lib/escapeHtml";


export async function subscribeToNewsletter(email) {
  try {
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Please provide a valid email address",
      };
    }

    const safeEmail = escapeHtml(email);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILP,
      },
    });

    const subscriberMailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: "Welcome to Nina",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F2;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(61,56,50,0.08);">
            <h2 style="color: #3D3832; text-align: center; margin-bottom: 20px;">
              Welcome to Nina
            </h2>

            <p style="color: #6B6560; font-size: 16px; line-height: 1.6;">
              Thank you for joining this space. I'm glad you're here.
            </p>

            <p style="color: #6B6560; font-size: 16px; line-height: 1.6;">
              Each week, you'll receive:
            </p>

            <ul style="color: #6B6560; font-size: 16px; line-height: 1.8; margin-left: 20px;">
              <li>Gentle reflections on mindful living</li>
              <li>Simple practices for everyday calm</li>
              <li>Thoughts on intentional, peaceful days</li>
            </ul>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #9A9490; font-size: 14px;">
                If you didn't subscribe, please ignore this email.
              </p>
            </div>

            <div style="border-top: 1px solid #E8DFD0; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #9A9490; font-size: 12px; margin: 0;">
                Nina. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    };

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
              Email: ${safeEmail}
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
              Subscribed on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

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
