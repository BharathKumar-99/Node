const userModel = require("../model/user_model")
const jwt = require('jsonwebtoken');
const secret = process.env.secret;


const login = async (req, res) => {
    try {
        await userModel.login(req, res).then((val) => {
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
        await userModel.signup(req, res).then((val) => {
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
const getAllUser = async (req, res) => {
    try {
        await userModel.getAllUser(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Retreved successful"
                })
            } else {
                res.send({
                    "data": "No User Found"
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
const getSingleUser = async (req, res) => {
    try {
        await userModel.getSingleUser(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Retreved successful"
                })
            } else {
                res.send({
                    "data": "No User Found"
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
const createNewUser = async (req, res) => {
    try {
        await userModel.createNewUser(req, res).then((val) => {
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
                        "message": "Data Created successful"
                    })
                }

            } else {
                res.send({
                    "data": "No User Found"
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
const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(req, res).then((val) => {
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
const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "User Deleted successful"
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

//Admin
const adminLogin = async (req, res) => {
    try {
        await userModel.adminLogin(req, res).then((val) => {
            if (val != null) {
                const token = jwt.sign({ data: val }, secret, { expiresIn: '10d' });
                res.send({
                    "data": val,
                    "token": token,
                    "message": "Login successful"
                })
            } else {
                res.send({
                    "data": null,
                    "message": "Email or Password Wrong"
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

const adminSignup = async (req, res) => {
    try {
        await userModel.adminSignup(req, res).then((val) => {
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





module.exports = {
    login,
    signup, adminLogin, adminSignup, getAllUser, getSingleUser, createNewUser, updateUser, deleteUser
}