const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
var csv = require('csvtojson')


module.exports.addQuestion = async function (req) {
    try {

        const question = await prisma.question.create({
            data: {
                question: req.body.question,
                option1: req.body.option1,
                option2: req.body.option2,
                option3: req.body.option3,
                option4: req.body.option4,
                correctOption: req.body.correctOption,
            }
        });
        return question;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        console.log(e);
        return JSON.stringify(e)
    }


}

module.exports.addBulkQuestions = async function (req) {

    try {
        var bulkQuestions = [];
        await csv().fromFile(req.file.path).then((response) => {

            for (let index = 0; index < response.length; index++) {
                bulkQuestions.push(response[index]);
                console.log(bulkQuestions);
            }

            return question = prisma.question.createMany({
                data: bulkQuestions,
            });

        });



    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        console.log(e);
        return JSON.stringify(e)
    }

}

