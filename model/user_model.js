const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports.signup = async function (req) {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }
        });
        return user;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        console.log(e.code);
        return JSON.stringify(e.code)
    }


}
module.exports.login = async function (req) {

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });

        return user;


    } catch (e) {

        console.log(e);
        return JSON.stringify(e)
    }

}
module.exports.getAllUser = async function (req) {
    try {
        const user = await prisma.user.findMany();
        return user;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}
module.exports.getSingleUser = async function (req) {
    try {
        const user = await prisma.user.findFirst(
            {
                where: {
                    id: req.body.id
                }
            }
        );
        return user;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}
module.exports.createNewUser = async function (req) {
    try {
        const user = await prisma.user.create(
            {
                data: {
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    profilePage: req.file.path
                }
            }
        );
        return user;
    } catch (e) {
        if (e.code === "P2002") {
            return "Email Exits Try Another"
        }
        return JSON.stringify(e)
    }
}
module.exports.updateUser = async function (req) {
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
        const user = await prisma.user.update(
            {
                where: {
                    id: parseInt(data.id)
                },
                data: updatedData
            }
        );
        return user;
    } catch (e) {
        if (e.code === "P2002") {
            return "Email Exits Try Another"
        }
        return JSON.stringify(e)
    }
}
module.exports.deleteUser = async function (req) {

    try {
        const user = await prisma.user.delete({
            where: {
                id: req.body.id
            }
        });
        return user;


    } catch (e) {

        console.log(e);
        return JSON.stringify(e)
    }

}


//Admin
module.exports.adminLogin = async function (req) {

    try {
        const user = await prisma.admin.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });

        return user;


    } catch (e) {

        console.log(e);
        return JSON.stringify(e)
    }

}
module.exports.adminSignup = async function (req) {
    try {
        const user = await prisma.admin.create({
            data: {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }
        });
        return user;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                return 'Email Already Exists Try Different Email Address';
            }
        }
        console.log(e.code);
        return JSON.stringify(e.code)
    }


}