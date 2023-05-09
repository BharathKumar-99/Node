const courseModel = require("../model/course_model")
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const createCourse = async (req, res) => {
    try {
        await courseModel.courseCreate(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Created successful"
                })
            } else {
                res.send({
                    "data": "No Instructor Found"
                })
            }
        })
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            message: error.message
        });
    }
}

const getAllCourses = async (req, res) => {
    try {
        await courseModel.getAllCourses(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Reterived successful"
                })
            } else {
                res.send({
                    "data": "No Categories Found"
                })
            }
        })
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createCourse, getAllCourses
}