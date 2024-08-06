const mongoose = require('mongoose');
const uri = "mongodb+srv://webmail:19890604@insurancedb.0owihzx.mongodb.net/sample_roadquiz?retryWrites=true&w=majority&appName=insurancedb";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to MongoDB");
});

const questionSchema = new mongoose.Schema({
    questionText: String,
    info: String,
    image: String,
    options: [{
        text: String,
        correct: Boolean
    }]
});

const Question = mongoose.model('motor', questionSchema);

const questions = [
    {
        "questionText": "With an M1 license, when are you allowed to drive?",
        "info": "",
        "image": "",
        "options": [
          { "text": "Weekdays" },
          { "text": "At night" },
          { "text": "Weekends" },
          {
            "text": "Only during daylight hours — one-half hour before sunrise to one-half hour after sunset",
            "correct": true
          }
        ]
      }
];

questions.forEach(question => {
    const newQuestion = new Question(question);
    newQuestion.save().then(doc => console.log("Question saved:", doc)).catch(err => console.error("Error saving question:", err));
});

