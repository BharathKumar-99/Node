const questionModel = require("../model/questions_table")

const bulkUpload = async (req, res) => {
    try {
        await questionModel.addBulkQuestions(req, res).then((val) => res.send(val))
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            message: error.message
        });
    }
}

const singleUpload = async (req, res) => {
    await questionModel.addQuestion(req).then((val) => res.send(val))

}




module.exports = {
    bulkUpload,
    singleUpload
}