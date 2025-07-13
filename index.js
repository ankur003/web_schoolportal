const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// WhatsApp Client using LocalAuth for persistent session
const client = new Client({
    authStrategy: new LocalAuth(), // session will be saved in .wwebjs_auth/
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true
    }
});

// Display QR code in terminal if not logged in
client.on('qr', (qr) => {
    console.log('📱 Scan the QR code below with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Client is ready
client.on('ready', () => {
    console.log('✅ WhatsApp bot is ready!');
});

// Log errors
client.on('auth_failure', msg => {
    console.error('❌ Authentication failed:', msg);
});

client.on('disconnected', reason => {
    console.warn('⚠️ Disconnected:', reason);
});

client.initialize();

// REST API to send message
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ success: false, message: 'Number and message are required' });
    }

    const chatId = number + '@c.us'; // for WhatsApp individual user

    try {
        await client.sendMessage(chatId, message);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        console.error('❌ Error sending message:', err);
        res.status(500).json({ success: false, message: 'Failed to send message', error: err.message });
    }
});

// Start Express server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
