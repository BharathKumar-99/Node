const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.courseCreate = async function (req) {
    try {
        const contentList = await prisma.contentList.create(
            {
                data: {
                    name: req.body.contentListName,
                    contentTypeId: parseInt(req.body.contentTypeId),
                    downloadable: req.body.downloadable ?? true,
                    description: req.body.contentListdescription,
                    video: req.files['contentVideo'][0].path,
                    read: req.body.read ?? false
                }
            }
        );

        const content = await prisma.content.create(
            {
                data: {
                    name: req.body.contentName,
                    contentListId: contentList.id,
                }
            }
        );

        const courses = await prisma.courses.create(
            {

                data: {
                    name: req.body.name,
                    instructorId: parseInt(req.body.instructorId),
                    videoIntro: req.files['courseIntroVideo'][0].path,
                    duration: req.body.duration,
                    categoriesId: parseInt(req.body.categoriesId),
                    contentId: content.id
                }
            }
        );
        const information = await prisma.information.create(
            {
                data: {
                    coursesId: courses.id,
                    description: req.body.description
                }
            }
        );
        return courses;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}

module.exports.getAllCourses = async function (req) {
    try {
        const courses = await prisma.courses.findMany(
            {
                include: {
                    instructor: true, information: true, content: {
                        include: { contentlist: true }
                    }, Categories: true
                },
            }
        );
        return courses;
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}