const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports.signup = async function (req) {
    try {
        console.log(req);
        const instructor = await prisma.instructor.create({
            data: {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }
        });
        return instructor;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        console.log(e);
        return JSON.stringify(e.code)
    }


}
module.exports.login = async function (req) {

    try {
        const instructor = await prisma.instructor.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });

        return instructor;


    } catch (e) {

        console.log(e);
        return JSON.stringify(e)
    }

}
module.exports.getAllinstructor = async function (req) {
    try {
        const instructor = await prisma.instructor.findMany();
        return instructor;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}
module.exports.getSingleinstructor = async function (req) {
    try {
        const instructor = await prisma.instructor.findFirst(
            {
                where: {
                    id: req.body.id
                }
            }
        );
        return instructor;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}
module.exports.createNewinstructor = async function (req) {
    try {
        const instructor = await prisma.instructor.create(
            {
                data: {
                    email: req.body.email,
                    image: req.file.path,
                    password: req.body.password,
                    name: req.body.name,
                    consultant: req.body.isConsultant
                }
            }
        );
        return instructor;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}
module.exports.updateinstructor = async function (req) {
    var data = req.body;
    try {
        const updatedData = {

            id: parseInt(data.id),
            name: data.name ?? undefined,
            email: data.email ?? undefined,
            profilePage: req.file?.path ?? undefined,
            languageId: data.languageId ?? undefined,
            newsLetter: data.newsLetter ?? undefined,
            profileMessage: data.profileMessage ?? undefined,
            timezoneid: data.timezoneid ?? undefined,
            countryId: data.countryId ?? undefined,
            provinceId: data.provinceId ?? undefined,
            cityId: data.cityId ?? undefined,
            districtId: data.districtId ?? undefined,
            informationId: data.informationId ?? undefined
            // add other fields that you want to update
        }
        const instructor = await prisma.instructor.update(
            {
                where: {
                    id: parseInt(data.id)
                },
                data: updatedData
            }
        );
        return instructor;
    } catch (e) {
        if (e.code === "P2002") {
            return "Email Exits Try Another"
        }
        return JSON.stringify(e)
    }
}
module.exports.deleteinstructor = async function (req) {

    try {
        const instructor = await prisma.instructor.delete({
            where: {
                id: req.body.id
            }
        });
        return instructor;


    } catch (e) {

        console.log(e);
        return JSON.stringify(e)
    }

}
