const InstructorModel = require("../model/instructor_model")
const jwt = require('jsonwebtoken');
const secret = process.env.secret;


const login = async (req, res) => {
    try {
        await InstructorModel.login(req, res).then((val) => {
            if (val != null) {
                const token = jwt.sign({ data: val }, secret, { expiresIn: '10d' });
                res.send({
                    "data": val,
                    "token": token,
                    "message": "Login successful"
                })
            } else {
                res.send({
                    "data": "Email or Password Wrong"
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
const signup = async (req, res) => {
    try {
        await InstructorModel.signup(req, res).then((val) => {
            if (val != null) {
                if (val == 'Email Already Exists Try Different Email Address') {
                    res.send({
                        "data": null,
                        "message": val
                    })
                } else {
                    const token = jwt.sign({ data: val }, secret, { expiresIn: '10d' });
                    res.send({
                        "data": val,
                        "token": token,
                        "message": "Signup successful"
                    })
                }
            } else {
                res.send({
                    "data": "All Field Required"
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
const getAllInstructor = async (req, res) => {
    try {
        await InstructorModel.getAllinstructor(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Retreved successful"
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
const getSingleInstructor = async (req, res) => {
    try {
        await InstructorModel.getSingleinstructor(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Retreved successful"
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
const createNewInstructor = async (req, res) => {
    try {
        await InstructorModel.createNewinstructor(req, res).then((val) => {
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
const updateInstructor = async (req, res) => {
    try {
        await InstructorModel.updateinstructor(req, res).then((val) => {
            if (val != null) {
                if (val === "Email Exits Try Another") {
                    res.send({
                        "data": null,
                        "message": val
                    })
                }
                else {
                    res.send({
                        "data": val,
                        "message": "Data Updated successful"
                    })
                }
            } else {
                res.send({
                    "data": "Something Went Wrong"
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
const deleteInstructor = async (req, res) => {
    try {
        await InstructorModel.deleteinstructor(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Instructor Deleted successful"
                })
            } else {
                res.send({
                    "data": "Something Went Wrong"
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
    login,
    signup, getAllInstructor, getSingleInstructor, createNewInstructor, updateInstructor, deleteInstructor
}