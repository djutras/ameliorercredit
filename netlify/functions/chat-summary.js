import sgMail from '@sendgrid/mail';

// Netlify serverless function - Send chat summary email via SendGrid
export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { formData, transcript, endReason } = JSON.parse(event.body);

    if (!formData || !transcript) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'formData and transcript are required',
        }),
      };
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Generate submission ID
    const now = new Date();
    const submissionId =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');

    const endReasonLabel =
      endReason === 'inactivity'
        ? 'Inactivité (2 min)'
        : endReason === 'manual'
          ? 'Terminée par le client'
          : 'Autre';

    // Build transcript HTML
    const transcriptHtml = transcript
      .map((msg) => {
        const isAssistant = msg.role === 'assistant';
        const bgColor = isAssistant ? '#dbeafe' : '#fee2e2';
        const borderColor = isAssistant ? '#3b82f6' : '#ef4444';
        const label = isAssistant ? 'Conseiller' : 'Client';
        return `
          <div style="margin-bottom: 12px; padding: 10px 14px; background-color: ${bgColor}; border-left: 4px solid ${borderColor}; border-radius: 4px;">
            <strong style="color: ${borderColor};">${label}:</strong>
            <p style="margin: 4px 0 0 0; line-height: 1.5;">${msg.content}</p>
          </div>`;
      })
      .join('');

    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.SENDER_EMAIL,
      subject: `Crédit-Action CHAT ${formData.name || 'Client'} #${submissionId}`,
      text: `Résumé de consultation chat\n\nClient: ${formData.name}\nCourriel: ${formData.email}\nTéléphone: ${formData.phone || 'Non fourni'}\nDéfi: ${formData.creditChallenge || 'Non spécifié'}\nCote: ${formData.creditScore || 'Non spécifié'}\nSource: ${formData.source || 'N/A'}\nFin: ${endReasonLabel}\n\nTranscription:\n${transcript.map((m) => `${m.role === 'assistant' ? 'Conseiller' : 'Client'}: ${m.content}`).join('\n\n')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Résumé de consultation chat</h2>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p><strong>Nom:</strong> ${formData.name || 'N/A'}</p>
            <p><strong>Courriel:</strong> <a href="mailto:${formData.email}">${formData.email || 'N/A'}</a></p>
            <p><strong>Téléphone:</strong> ${formData.phone || 'Non fourni'}</p>
            <p><strong>Défi de crédit:</strong> ${formData.creditChallenge || 'Non spécifié'}</p>
            <p><strong>Cote de crédit:</strong> ${formData.creditScore || 'Non spécifié'}</p>
            <p><strong>Source:</strong> ${formData.source || 'N/A'}</p>
            <p><strong>Fin de consultation:</strong> ${endReasonLabel}</p>
            <p><strong>ID:</strong> #${submissionId}</p>
            <p><strong>Messages échangés:</strong> ${transcript.length}</p>
          </div>

          <h3 style="color: #1e40af;">Transcription complète</h3>
          ${transcriptHtml}
        </div>
      `,
      replyTo: formData.email,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Summary email sent' }),
    };
  } catch (error) {
    console.error('Chat summary error:', error);
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: 'Failed to send summary email',
        details: error.message,
        sgError: error.response?.body || null,
      }),
    };
  }
}
