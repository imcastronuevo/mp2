require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./utils/routes');
const connectToDatabase = require('./utils/database');  // Change the import to use connectToDatabase function

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection from database.js
const mongooseConnection = connectToDatabase();

// Static file
app.use(express.static(__dirname));

// routes
app.use('/', routes);

const FormData = require('./models/formData');

app.post('/submit-form', (req, res) => {
    const formData = new FormData(req.body);

    formData.save()
        .then(() => {
            console.log('Form data saved successfully');
            res.status(200).send('Form data saved successfully');
        })
        .catch((err) => {
            console.error('Error saving form data:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
