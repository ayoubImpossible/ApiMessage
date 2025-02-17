// src/controller/GetAllMessagesByEmail.js
const { db } = require('../utils/firebase');

const getAllMessagesByEmail = async (req, res) => {
    const { email } = req.params; // Get the email from the URL parameters

    try {
        const messagesSnapshot = await db.collection('messages')
            .where('from', '==', email)
            .get();

        const messages = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

       


        res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting messages: ", error);
        res.status(500).json({ error: "An error occurred while retrieving messages." });
    }
};

module.exports = getAllMessagesByEmail;
