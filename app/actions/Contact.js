"use server";
import nodemailer from "nodemailer";

export async function sendEmail(prevState, formData) {
  const errors = {};
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Basic validation
  /*if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!message.trim()) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return { message: "Please fix the errors below", errors, success: false };
  }*/

  // SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILP,
    },
  });

  // Email content
  const mailOptions = {
    from: `"Contact Form" <${process.env.MAIL}>`,
    to: process.env.MAILR,
    subject: `New Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Your message has been sent successfully!",
      errors: {},
    };
  } catch (error) {
    console.error("SMTP Error:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
      errors: {},
    };
  }
}
