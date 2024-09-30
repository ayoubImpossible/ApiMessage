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
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: 'https://powerappschat-default-rtdb.firebaseio.com/' // Remplace par l'URL de ta base
});



const db = firebase.firestore();




// Route de test (GET)
app.get('/', (req, res) => {
  res.send('API Firebase avec Node.js est opérationnelle !');
});











app.use(express.json()); // Pour parser le JSON dans les requêtes

app.post('/messages', async (req, res) => {
  
    res.status(200).json({ error: ' message' });
 // }
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
