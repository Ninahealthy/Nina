"use server";
import nodemailer from "nodemailer";

export async function sendEmail(prevState, formData) {
  const errors = {};
  const name = formData.get("name");
  const email = formData.get("email");

  // Basic validation
  if (!name || !name.trim()) {
    errors.name = "Name is required";
  }

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      message: "Please fix the errors below",
      errors,
      success: false,
    };
  }

  try {
    // SMTP configuration
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILP,
      },
    });

    // Send confirmation email to user
    const userMailOptions = {
      from: `"NinaHealthy 💚" <${process.env.MAIL}>`,
      to: email,
      subject: `Welcome to NinaHealthy Newsletter, ${name}!`,
      text: `
        Hi ${name},
        
        Thank you for subscribing to our newsletter!
        You'll receive regular updates about health tips and inspiration.
        
        Best regards,
        NinaHealthy Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Welcome to NinaHealthy Newsletter!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for subscribing to our newsletter! 🎉</p>
          <p>You'll receive regular updates about health tips and inspiration.</p>
          <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
            <p><strong>Your subscription details:</strong></p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <p style="margin-top: 20px;">Best regards,<br>
          <strong>NinaHealthy Team</strong></p>
        </div>
      `,
    };

    // Send notification to admin (optional)
    const adminMailOptions = {
      from: `"Newsletter Signup" <${process.env.MAIL}>`,
      to: process.env.MAILR || process.env.MAIL,
      subject: "New Newsletter Subscription",
      text: `
        New newsletter subscription:
        Name: ${name}
        Email: ${email}
        Time: ${new Date().toLocaleString()}
      `,
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    // Send confirmation email to user
    await transporter.sendMail(userMailOptions);

    // Send notification to admin if MAILR is configured
    if (process.env.MAILR) {
      await transporter.sendMail(adminMailOptions);
    }

    return {
      success: true,
      message: "Successfully subscribed! Check your inbox for confirmation.",
      errors: {},
    };
  } catch (error) {
    console.error("SMTP Error:", error);
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
      errors: {},
    };
  }
}

/*"use server";
import nodemailer from "nodemailer";

export async function sendEmail(prevState, formData) {
  const errors = {};
  const name = formData.get("name");
  const email = formData.get("email");

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
/*const transporter = nodemailer.createTransport({
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
    from: `"NinaHealthy 💚" <${process.env.MAIL}>`,
    to: `${email}`,
    subject: `Hi ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
    `,
    html: `
      <h3>Hi ${name}</h3>
      <p>Thanks for reaching !</p>
      <p><strong>Email:</strong> ${email}</p>
     
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Now, Check Your Inbox !",
      errors: {},
    };
  } catch (error) {
    console.error("SMTP Error:", error);
    return {
      success: false,
      message: "Please try again later.",
      errors: {},
    };
  }
}
*/
