const fetch = require('node-fetch');

module.exports = async (req, res) => {
    console.log('Request received at /api/submitFeedback');
    console.log('Request method:', req.method);

    if (req.method === 'POST') {
        console.log('Processing POST request...');
        const { email, comment } = req.body;

        console.log('Received data:', { email, comment });

        // Log missing comment
        if (!comment || comment.trim() === '') {
            console.error('Error: Missing or empty comment field');
            return res.status(400).json({ success: false, error: 'Comment is required' });
        }

        // Validate environment variables
        const appId = process.env.AIRTABLE_APP_ID;
        const apiKey = process.env.AIRTABLE_API_KEY;

        console.log('Environment variables:', { appId, apiKey });

        if (!appId || !apiKey) {
            console.error('Error: Missing environment variables');
            return res.status(500).json({
                success: false,
                error: 'Server configuration is invalid. Check environment variables.',
            });
        }

        try {
            // Log data to be sent to Airtable
            const fields = {
                Email: email || '',
                Comment: comment,
            };
            console.log('Sending data to Airtable:', fields);

            // Send data to Airtable
            const response = await fetch(`https://api.airtable.com/v0/${appId}/Feedback`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fields }),
            });

            console.log('Airtable API response status:', response.status);

            const data = await response.json();
            console.log('Airtable API response data:', data);

            // Check for Airtable errors
            if (!response.ok) {
                console.error('Airtable error response:', data);
                return res.status(500).json({
                    success: false,
                    error: data.error?.message || 'Failed to submit feedback to Airtable',
                });
            }

            // Success response
            console.log('Feedback submitted successfully:', data);
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error('Unexpected server error:', error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        console.log('Invalid request method:', req.method);
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
