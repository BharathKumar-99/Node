const express = require('express');
const { login, signup, getAllInstructor, getSingleInstructor, createNewInstructor, updateInstructor, deleteInstructor } = require('../controller/instructor_controller');
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

router.get('/getAllInstructor', function (req, res) {
    getAllInstructor(req, res);
});

router.post('/getSingleInstructor', function (req, res) {
    getSingleInstructor(req, res);
});

router.post('/signup', function (req, res) {
    signup(req, res);
});

router.post('/createInstructor', upload.single('profilePic'), function (req, res) {
    createNewInstructor(req, res);
});

router.patch('/updateInstructor', upload.single('profilePic'), function (req, res) {
    updateInstructor(req, res);
});

router.delete('/deleteInstructor', function (req, res) {
    deleteInstructor(req, res);
});


module.exports = router;