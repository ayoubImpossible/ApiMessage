// Importer les modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');
require('dotenv').config();

// Initialiser l'application Express
const app = express();
firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Assure-toi que les sauts de ligne sont correctement formatés
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});



const db = firebase.firestore();




// Route de test (GET)
app.get('/', (req, res) => {
  res.send('API Firebase avec Node.js est opérationnelle !');
});






// Route POST pour envoyer un message à Firebase
app.post('/messages', async (req, res) => {
  try {
    // Extracting email and content from the request body
    const { email, content } = req.body;

    // Check if email and content are provided
    if (!email || !content) {
      return res.status(400).json({ error: 'Email and content are required' });
    }

    // Create the message object
    const message = {
      email,
      content,
      timestamp: new Date()
    };

    // Store the message in the Firestore collection
    const docRef = await db.collection('messages').add(message);

    // Respond with the created message
    res.status(201).json({ id: docRef.id, ...message });
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ error: 'Failed to post message' });
  }
});



app.use((req, res) => {
    res.status(404).send('Not Found');
});





//developpment Api




// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
