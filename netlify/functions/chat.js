// Netlify serverless function - OpenRouter AI chat proxy
export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { messages, formData } = JSON.parse(event.body);

    if (!formData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'formData is required' }),
      };
    }

    const clientName = formData.name || 'Client';
    const clientEmail = formData.email || '';
    const clientPhone = formData.phone || '';
    const creditChallenge = formData.creditChallenge || 'Non spécifié';
    const creditScore = formData.creditScore || 'Non spécifié';

    const systemPrompt = `Tu es un conseiller en amélioration de crédit pour Crédit-Action, une entreprise québécoise spécialisée dans l'amélioration des cotes de crédit Equifax et TransUnion.

INFORMATIONS DU CLIENT (provenant du formulaire):
- Nom: ${clientName}
- Courriel: ${clientEmail}
- Téléphone: ${clientPhone}
- Défi de crédit principal: ${creditChallenge}
- Cote de crédit estimée: ${creditScore}

TON RÔLE:
Tu es un conseiller empathique et professionnel. Tu poses des questions pour mieux comprendre la situation financière du client et qualifier le prospect. Tu ne donnes PAS de conseils financiers spécifiques, mais tu expliques comment Crédit-Action peut aider.

SCRIPT DE QUALIFICATION:
1. Accueille chaleureusement le client par son prénom et mentionne que tu as bien reçu sa demande.
2. Confirme le défi de crédit mentionné et demande des précisions sur sa situation.
3. Pose des questions sur:
   - Depuis combien de temps il a ce problème de crédit
   - S'il a des projets qui nécessitent un bon crédit (hypothèque, auto, etc.)
   - S'il a déjà consulté son dossier de crédit récemment
4. Explique brièvement comment Crédit-Action fonctionne (analyse gratuite du dossier, plan d'action personnalisé, suivi continu).
5. Propose de planifier un appel avec un spécialiste pour une analyse approfondie.

RÈGLES:
- Réponds TOUJOURS en français québécois naturel (pas trop formel).
- Garde tes réponses courtes (2-4 phrases max).
- Sois empathique mais professionnel.
- Ne promets JAMAIS de résultats spécifiques (ex: "on va augmenter votre cote de 100 points").
- Si le client pose des questions hors sujet, ramène poliment la conversation sur sa situation de crédit.
- Ne mentionne JAMAIS que tu es une IA ou un chatbot. Tu es un conseiller.`;

    // Build the messages array for OpenRouter
    const apiMessages = [{ role: 'system', content: systemPrompt }];

    if (!messages || messages.length === 0) {
      // First call - trigger the greeting
      apiMessages.push({
        role: 'user',
        content: `[Le client vient de remplir le formulaire de consultation. Accueille-le chaleureusement par son prénom (${clientName.split(' ')[0]}) et engage la conversation en référençant son défi de crédit: "${creditChallenge}".]`,
      });
    } else {
      // Subsequent calls - pass the full conversation history
      for (const msg of messages) {
        apiMessages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://credit-action.com',
          'X-Title': 'Credit-Action Consultation',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-sonnet-4.5',
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', response.status, errorData);
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: 'Erreur du service IA. Veuillez réessayer.',
        }),
      };
    }

    const data = await response.json();
    const assistantMessage =
      data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: assistantMessage }),
    };
  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Une erreur interne est survenue. Veuillez réessayer.',
      }),
    };
  }
}
