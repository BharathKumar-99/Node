const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/questions', require('./routes/questions'));
app.get('/', function (req, res) {
    res.send('Server Up');
})
app.listen(PORT, console.log("Server don start for port: " + PORT))