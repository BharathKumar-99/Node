const categoriesModel = require("../model/categories_model")


const createCategories = async (req, res) => {
    try {
        await categoriesModel.createCategories(req, res).then((val) => {
            if (val != null) {
                res.send({
                    "data": val,
                    "message": "Data Created successful"
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
const getAllCategories = async (req, res) => {
    try {
        await categoriesModel.getAllCategories(req, res).then((val) => {
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
    createCategories, getAllCategories
}