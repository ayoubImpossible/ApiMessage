const express = require('express');
const getConversation= require('../controller/GetConversation.js');
//const deleteMessage = require('../Controller/DeleteMessage');
//const getAllMessagesByEmail = require('../Controller/GetAllMessageByEmail');
const postMessage = require('../controller/PostMessage.js');

const router = express.Router();


router.post('/message', postMessage);
//chgsdgcjhfg

router.get('/conversation', getConversation);

//router.delete('/messages/:messageId', deleteMessage);

//router.get('/messages/:email', getAllMessagesByEmail); // Add the new route




module.exports = router;