const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { email, comment } = req.body;

        // Validar que 'comment' tenga datos
        if (!comment || comment.trim() === '') {
            return res.status(400).json({ success: false, error: 'Comment is required' });
        }

        // Validar configuración de las variables de entorno
        const appId = process.env.AIRTABLE_APP_ID;
        const apiKey = process.env.AIRTABLE_API_KEY;

        if (!appId || !apiKey) {
            console.error('Variables de entorno faltantes:', { appId, apiKey });
            return res
                .status(500)
                .json({ success: false, error: 'Server configuration is invalid. Check environment variables.' });
        }

        try {
            // Enviar datos a Airtable
            const response = await fetch(`https://api.airtable.com/v0/${appId}/Feedback`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: {
                        Email: email || '', // Email opcional (vacío si no se proporciona)
                        Comment: comment,  // Comment obligatorio
                    },
                }),
            });

            const data = await response.json();

            // Verificar si Airtable devolvió un error
            if (!response.ok) {
                console.error('Error de Airtable:', data);
                throw new Error(data.error?.message || 'Failed to submit feedback to Airtable');
            }

            // Éxito: Devolver datos al cliente
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error('Error al enviar feedback:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
