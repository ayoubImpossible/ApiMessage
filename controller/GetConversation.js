// src/controller/getConversation.js
const { db } = require('../utils/firebase'); // Adjust according to your setup
const admin = require('firebase-admin');

const getConversation = async (req, res) => {
    const { email1, email2 } = req.params; // Get emails from request parameters

    try {
        const messagesRef = db.collection('messages');
        const query = messagesRef.where('from', 'in', [email1, email2])
                                   .where('to', 'in', [email1, email2])
                                   .orderBy('timestamp'); // Assuming you have a timestamp field

        const snapshot = await query.get();
        const messages = [];

        snapshot.forEach(doc => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting conversation: ", error);
        res.status(500).json({ error: "An error occurred while fetching the conversation." });
    }
};

module.exports = getConversation;
