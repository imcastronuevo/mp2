const express = require('express');
const path = require('path');
const router = express.Router();
const FormData = require('../models/formData'); // Update the path based on your project structure

// Existing routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'contact.html'));
});

router.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'services.html'));
});

// New route for form submission
router.post(`/submit-form`, (req, res) => {
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

module.exports = router;
