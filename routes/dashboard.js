const express = require('express');
//const { login, signup, adminLogin, adminSignup } = require('../controller/user_controller');
const { dashboardApi } = require('../controller/dashboard_controller');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

router.post('/home', function (req, res) {
    console.log(req.body);
    dashboardApi(req, res);
});
module.exports = router;