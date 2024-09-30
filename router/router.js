const express = require('express');

const getConversation = require('../Controller/GetConversation');
const deleteMessage = require('../Controller/DeleteMessage');
const getAllMessagesByEmail = require('../Controller/GetAllMessageByEmail');
const postMessage  = require('../Controller/PostMessage');

const router = express.Router();



router.post('/message', postMessage);

router.get('/conversation/:email1/:email2', getConversation);

router.delete('/messages/:messageId', deleteMessage);

router.get('/messages/:email', getAllMessagesByEmail); // Add the new route




module.exports = router;