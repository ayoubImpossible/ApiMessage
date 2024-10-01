// src/controller/DeleteMessage.js
const { db } = require('../utils/firebase');

const deleteMessage = async (req, res) => {
    const { messageId } = req.params; // Assuming you're passing the message ID in the URL

    try {
        const messageRef = db.collection('messages').doc(messageId);
        const doc = await messageRef.get();

        // Check if the message exists
        if (!doc.exists) {
            return res.status(404).json({ error: "Message not found." });
        }

        // Delete the message
        await messageRef.delete();

        res.status(200).json({ message: "Message deleted successfully." });
    } catch (error) {
        console.error("Error deleting message: ", error);
        res.status(500).json({ error: "An error occurred while deleting the message." });
    }
};

module.exports = deleteMessage;
