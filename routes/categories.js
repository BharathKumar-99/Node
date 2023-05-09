const express = require('express');
const { createCategories, getAllCategories } = require('../controller/categories_controller');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const multer = require('multer');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));

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

router.post('/createCategories', upload.single('categoriesImage'), function (req, res) {
    createCategories(req, res);
});

router.get('/getAllCategories', function (req, res) {
    getAllCategories(req, res);
});



module.exports = router;