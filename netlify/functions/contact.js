import sgMail from '@sendgrid/mail';

// Netlify serverless function handler
export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse request body
    const { name, email, phone, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Name, email, and message are required'
        })
      };
    }

    // Initialize SendGrid with API key from environment variables
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Generate timestamp-based unique ID (format: YYYYMMDDHHMMSS)
    const now = new Date();
    const submissionId =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');

    // Prepare email content
    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.SENDER_EMAIL,
      subject: `Crédit-Action ${name} #${submissionId}`,
      text: `
Nouveau message de contact:

Nom: ${name}
Email: ${email}
Téléphone: ${phone || 'Non fourni'}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Nouveau message de contact</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
            <p><strong>ID de soumission:</strong> #${submissionId}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #1e40af;">Message:</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email via SendGrid
    await sgMail.send(msg);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('SendGrid Error:', error);

    if (error.response) {
      console.error('Error Response:', error.response.body);
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email. Please try again later.'
      })
    };
  }
}
