export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }

    try {
        // Optionally: Send an email using a service like Nodemailer, SendGrid, etc.
        // For now, just log to the console
        console.log(`Feedback received from ${name} (${email}): ${message}`);

        // Respond with success
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error handling feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
