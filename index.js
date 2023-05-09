const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/public", express.static("public"));
app.use('/questions', require('./routes/questions'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/courses', require('./routes/courses'));
app.use('/instructors', require('./routes/instructors'));
app.use('/categories', require('./routes/categories'));
// app.use('/organization', require('./routes/organization'));

app.get('/', function (req, res) {
    res.send('Server Up');
})
app.listen(PORT, console.log("Server done start for port: " + PORT))