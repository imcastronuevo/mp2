require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Use express.json() for parsing JSON requests
app.use(express.json());

// Set up static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

// Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

// Schema and model for form data
const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: String,
    phoneNumber: String,
    preferredDatetime: Date,
  });
  

const FormData = mongoose.model('FormData', formDataSchema);

// Event handling for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');

  // Handle form submissions
  app.post('/submit-form', (req, res) => {
    const formData = new FormData(req.body);

    formData.save()
      .then(() => {
        console.log('Form data saved successfully');
        res.status(200).send('Form data saved successfully');
      })
      .catch((err) => {
        console.error('Error saving form data:', err);
        res.status(500).send('Internal Server Error: Could not save form data');
      });
  });

  // Start the server after MongoDB connection is established
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
