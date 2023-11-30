const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


const mongoURI = 'mongodb+srv://imcastronuevo:sAR880chSW0r1XSc@cluster0.vtj4bqe.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI);

const db = mongoose.connection;

// schema and model 
const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: String,
    phoneNumber: String,
    preferredDatetime: Date,
});

const FormData = mongoose.model('FormData', formDataSchema);

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
          res.status(500).send('Internal Server Error');
        });
    });

    // Start the server after MongoDB connection is established
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
