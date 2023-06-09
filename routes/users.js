const express = require('express');
const { login, signup, adminLogin, adminSignup, getAllUser, getSingleUser, createNewUser, updateUser, deleteUser } = require('../controller/user_controller');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const multer = require('multer');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

//to Uplaod image
var stroage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            cb(null, './public/uploads')
        } catch (e) {
            console.log(e);
        }

    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: stroage })

router.post('/login', function (req, res) {

    login(req, res);
});

router.get('/getAllUser', function (req, res) {
    getAllUser(req, res);
});

router.post('/getSingleUser', function (req, res) {
    getSingleUser(req, res);
});

router.post('/signup', function (req, res) {
    signup(req, res);
});

router.post('/createUser', upload.single('profilePic'), function (req, res) {
    createNewUser(req, res);
});

router.patch('/updateUser', upload.single('profilePic'), function (req, res) {
    updateUser(req, res);
});

router.delete('/deleteUser', function (req, res) {
    deleteUser(req, res);
});

//Admin
router.post('/adminSignup', function (req, res) {
    adminSignup(req, res);
});
router.post('/adminlogin', function (req, res) {
    adminLogin(req, res);
});

module.exports = router;