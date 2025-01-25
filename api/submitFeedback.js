const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { email, comment } = req.body;

        // Ensure 'comment' is provided
        if (!comment || comment.trim() === '') {
            console.error('Error: Missing comment field');
            return res.status(400).json({ success: false, error: 'Comment is required' });
        }

        // Validate environment variables
        const appId = process.env.AIRTABLE_APP_ID;
        const apiKey = process.env.AIRTABLE_API_KEY;

        if (!appId || !apiKey) {
            console.error('Error: Missing environment variables', { appId, apiKey });
            return res.status(500).json({
                success: false,
                error: 'Server configuration is invalid. Check environment variables.',
            });
        }

        try {
            // Debug: Log the data being sent
            console.log('Sending data to Airtable:', {
                fields: {
                    Email: email || '', // Email is optional
                    Comment: comment,  // Comment is mandatory
                },
            });

            // Send data to Airtable
            const response = await fetch(`https://api.airtable.com/v0/${appId}/Feedback`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: {
                        Email: email || '',
                        Comment: comment,
                    },
                }),
            });

            const data = await response.json();

            // If Airtable returns an error
            if (!response.ok) {
                console.error('Airtable response error:', data);
                return res.status(500).json({
                    success: false,
                    error: data.error?.message || 'Failed to submit feedback to Airtable',
                });
            }

            // Success
            console.log('Feedback submitted successfully:', data);
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error('Unexpected server error:', error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
