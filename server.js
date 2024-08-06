const express = require('express');
const cors = require('cors');
const motorRouter = require('./routes/motor');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', motorRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Question Service API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
