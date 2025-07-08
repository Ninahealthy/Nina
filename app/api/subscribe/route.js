import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name and email are required",
        }),
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email format",
        }),
        { status: 400 }
      );
    }

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
        <h2>Welcome to NinaHealthy Newsletter!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for subscribing to our newsletter! 🎉</p>
        <p>You'll receive regular updates about health tips and inspiration.</p>
        <p>Best regards,<br>
        <strong>NinaHealthy Team</strong></p>
      `,
    };

    // Send notification email to admin (optional)
    const adminMailOptions = {
      from: `"Newsletter Signup" <${process.env.MAIL}>`,
      to: process.env.MAILR || process.env.MAIL,
      subject: "New Newsletter Subscription",
      text: `
        New newsletter subscription:
        Name: ${name}
        Email: ${email}
        Subject: ${subject || "Newsletter Subscription"}
        Message: ${message || "No additional message"}
      `,
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "Newsletter Subscription"}</p>
        <p><strong>Message:</strong> ${message || "No additional message"}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);

    // Only send admin notification if MAILR is set
    if (process.env.MAILR) {
      await transporter.sendMail(adminMailOptions);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully subscribed! Check your inbox for confirmation.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to subscribe. Please try again later.",
      }),
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests
export async function GET(req) {
  return new Response(
    JSON.stringify({ message: "Newsletter API is working" }),
    { status: 200 }
  );
}
import nodemailer from "nodemailer";

/*export async function POST(req) {
  if (req.method === "POST") {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP, // replace with your SMTP host
      port: 465, // replace with your SMTP port
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL, // replace with your SMTP user
        pass: process.env.MAILP, // replace with your SMTP password
      },
    });
    // create an email options object
    const mailOptions = {
      from: `${email} <${process.env.MAIL}>`, // sender address
      to: process.env.MAILR, // list of receivers
      subject: email, // subject line
      text: email, // plain text body
      // html: <p>some html here</p>, // html body (optional)
    };
    // send mail using the transporter
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      // return a success response
      return new Response(JSON.stringify({ success: true }));
    } catch (error) {
      console.error(error);
      // return an error response
      return new Response(JSON.stringify({ success: false }));
    }
  } else {
    return new Response(JSON.stringify({ message: "Method not allowed" }));
  }
}

/* // pages/api/contact.js
import nodemailer from "nodemailer";

export async function POST(req, res) {
  // check if the request method is POST

  // get the form data from the request body
  const { name, email, subject, message } = req.body;

  // create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP, // replace with your SMTP host
    port: 465, // replace with your SMTP port
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL, // replace with your SMTP user
      pass: process.env.MAILP, // replace with your SMTP password
    },
  });
  // create an email options object
  const mailOptions = {
    from: `${name} <${process.env.MAIL}>`, // sender address
    to: process.env.MAILR, // list of receivers
    subject: subject, // subject line
    text: `${message} <${email}>`, // plain text body
    // html: <p>some html here</p>, // html body (optional)
  };
  // send mail using the transporter
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // return a success response
    return new Response(JSON.stringify({ success: true }));
    //res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    // return an error response
    return new Response(JSON.stringify({ success: false }));

    //res.status(500).json({ success: false });
  }
  /*else {
    // return a 405 (method not allowed) response
    return new Response(JSON.stringify({ message: "Method not allowed" }));

    //res.status(405).json({ message: "Method not allowed" });
  }*/

/*import nodemailer from "nodemailer";

export async function GET(req, res) {
  // Handle GET requests (optional, e.g., pre-fill form data)
  return new Response("GET request received");
}

export async function POST(req, res) {
  if (!req.body) {
    return new Response("missing request body");
  }

  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP, // replace with your SMTP host
      port: 465, // replace with your SMTP port
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL, // replace with your SMTP user
        pass: process.env.MAILP, // replace with your SMTP password
      },
    });

    const mailOptions = {
      from: `${name} <${process.env.MAIL}>`, // sender address
      to: process.env.MAILR, // list of receivers
      subject: subject, // subject line
      text: `${message} <${email}>`, // plain text body
      // html: <p>some html here</p>, // html body (optional)
    };

   
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      // return a success response
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      // return an error response
      res.status(500).json({ success: false });
    }
   
  }

/*export async function GET(req, res) {
  // Handle GET requests
  const data = await fetchData(); // Assuming `fetchData` fetches data
  res.status(200).json(data);
}

export async function POST(req, res) {
  // Handle POST requests
  const { body } = req; // Assume data is sent in request body
  await processData(body); // Assuming `processData` handles posted data
  res.status(201).json({ message: 'Data processed successfully' });
}

// ...other method handlers (optional)

export default async function handler(req, res) {
  // Handle fallback for other methods (optional)
  res.status(405).json({ message: 'Method not allowed' });
}


/* // /api/contact/route.js
import nodemailer from "nodemailer";

// Function to handle POST requests (sending email)
export async function POST(req, res) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Extract form data from the request body
  const { name, email, subject, message } = req.body;

  // Validate form data (implement your own validation)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP, // Replace with your SMTP host
    port: 465, // Replace with your SMTP port
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL, // Replace with your SMTP user
      pass: process.env.MAILP, // Replace with your SMTP password
    },
  });

  // Create an email options object
  const mailOptions = {
    from: `${name} <${process.env.MAIL}>`, // sender address
    to: process.env.MAILR, // list of receivers
    subject: subject, // subject line
    text: `${message} <${email}>`, // plain text body
    // html: <p>some html here</p>, // html body (optional)
  };

  // Send mail using the transporter
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
}

// Optional function to handle GET requests (if applicable)
export async function GET(req, res) {
  // Logic for handling GET requests
  return res.status(200).json({ message: "Contact API (GET response)" });
}

// pages/api/contact.js
/*import nodemailer from "nodemailer";

export async function post(req, res) {
  // check if the request method is POST
  if (req.method === "POST") {
    // get the form data from the request body
    const { name, email, subject, message } = req.body;
    // create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP, // replace with your SMTP host
      port: 465, // replace with your SMTP port
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL, // replace with your SMTP user
        pass: process.env.MAILP, // replace with your SMTP password
      },
    });
    // create an email options object
    const mailOptions = {
      from: `${name} <${process.env.MAIL}>`, // sender address
      to: process.env.MAILR, // list of receivers
      subject: subject, // subject line
      text: `${message} <${email}>`, // plain text body
      // html: <p>some html here</p>, // html body (optional)
    };
    // send mail using the transporter
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      // return a success response
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      // return an error response
      res.status(500).json({ success: false });
    }
  } else {
    // return a 405 (method not allowed) response
    res.status(405).json({ message: "Method not allowed" });
  }
}

export async function getHandler(req, res) {}*/
