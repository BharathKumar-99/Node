const questionModel = require("../model/dashboard_model")

const dashboardApi = async (req, res) => {
    try {
        await questionModel.dashboardApi(req, res).then((val) => res.send(val))
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            message: error.message
        });
    }
}





module.exports = {
    dashboardApi,

}