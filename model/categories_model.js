const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.createCategories = async function (req) {
    try {
        const categories = await prisma.categories.create(
            {
                data: {
                    name: req.body.name,
                    image: req.file.path

                },
            }
        );
        return categories;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}


module.exports.getAllCategories = async function (req) {
    try {
        const categories = await prisma.categories.findMany(
            { include: { courses: true } }
        );
        return categories;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}