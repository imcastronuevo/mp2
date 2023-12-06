require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./utils/routes');
const connectToDatabase = require('./utils/database');

const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection from database.js
const mongooseConnection = connectToDatabase();

// Static file
app.use(express.static(__dirname));

// routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
