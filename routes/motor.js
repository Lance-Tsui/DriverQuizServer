const express = require('express');
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const router = express.Router();

// Setup Mongoose connection
const uri = "mongodb+srv://webmail:19890604@insurancedb.0owihzx.mongodb.net/sample_roadquiz?retryWrites=true&w=majority&appName=insurancedb";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to MongoDB");
});

// Define a Mongoose schema and model
const motorSchema = new mongoose.Schema({}, { collection: 'motor' });
const Motor = mongoose.model('Motor', motorSchema);

// Define route for retrieving motors
router.get('/motor', async (req, res) => {
    try {
        const motors = await Motor.find();  // Fetch all documents from the 'motor' collection
        const response = {
            questions: motors  // Wrap the results in an object under the 'questions' key
        };
        res.json(response); // Send the formatted object as a JSON response
    } catch (error) {
        console.error('Error retrieving motors:', error);
        res.status(500).json({ message: "Error retrieving data from database." });
    }
});

module.exports = router;
