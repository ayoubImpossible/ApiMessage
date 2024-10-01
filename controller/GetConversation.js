const { db } = require('../utils/firebase');

const getConversation = async (req, res) => {
    try {
        const { email1, email2 } = req.query;

        // Check if both email1 and email2 are provided
        if (!email1 || !email2) {
            return res.status(400).json({ error: 'Both email1 and email2 must be provided.' });
        }

        // Query to get all messages where email1 sent to email2 OR email2 sent to email1
        const conversationRef = db.collection('messages');

        const messagesSentByEmail1 = conversationRef
            .where('from', '==', email1)
            .where('to', '==', email2);

        const messagesSentByEmail2 = conversationRef
            .where('from', '==', email2)
            .where('to', '==', email1);

        // Run both queries simultaneously
        const [sentByEmail1, sentByEmail2] = await Promise.all([
            messagesSentByEmail1.get(),
            messagesSentByEmail2.get(),
        ]);

        // Combine the two sets of messages
        let conversation = [];

        sentByEmail1.forEach(doc => {
            conversation.push(doc.data());
        });

        sentByEmail2.forEach(doc => {
            conversation.push(doc.data());
        });

        // Sort the conversation by timestamp (optional)
        conversation.sort((a, b) => a.timestamp - b.timestamp);

        // Return the conversation as JSON
        res.status(200).json(conversation);
    } catch (error) {
        console.error('Error getting conversation:', error);
        res.status(500).json({ error: 'An error occurred while fetching the conversation.' });
    }
};

module.exports =  getConversation ;
