const express = require('express');
const { bulkUpload, singleUpload } = require('../controller/questions_controller');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const question = express();
question.use(bodyParser.urlencoded({ extended: true }));

question.use(express.static(path.resolve(__dirname, 'public')));

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
router.post('/bulk', upload.single('file'), function (req, res) {

    bulkUpload(req, res);
});
router.post('/single', function (req, res) {
    console.log(req.body);
    singleUpload(req, res);
});
module.exports = router;