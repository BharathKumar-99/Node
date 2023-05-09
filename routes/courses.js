const express = require('express');
const { createCourse, getAllCourses } = require('../controller/courses_controller');
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

router.post('/createCourse', upload.fields([{ name: "contentVideo" }, { name: "courseIntroVideo" }]), function (req, res) {
    createCourse(req, res);
});

router.get('/getAllCourses', function (req, res) {
    getAllCourses(req, res);
});

module.exports = router;