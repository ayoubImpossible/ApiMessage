// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router'); // Adjust the path as needed
const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Use the router
app.use('/api', router); // All routes in the router will be prefixed with /api

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
