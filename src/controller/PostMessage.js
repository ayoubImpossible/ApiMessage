// src/controller/messageController.js
const admin = require('firebase-admin');

// Function to post a message
const PostMessage = async (req, res) => {
    const { from, to, content } = req.body;

    if (!from || !to || !content) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const message = {
        from,
        to,
        content,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    try {
        // Save the message to Firestore
        await admin.firestore().collection('messages').add(message);
        return res.status(201).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Failed to send message.' });
    }
};

module.exports = PostMessage;
