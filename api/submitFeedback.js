const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { email, comment } = req.body;

        try {
            const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_APP_ID}/feedback`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: {
                        Email: email,
                        Comment: comment
                    }
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit feedback');
            }

            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
