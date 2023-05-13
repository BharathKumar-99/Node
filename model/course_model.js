const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.courseCreate = async function (req) {
    try {
        const courseData = {
            name: req.body.courseName,
            instructorId: parseInt(req.body.instructorId),
            videoIntro: req.files['courseIntroVideo'][0].path,
            duration: req.body.duration,
            categoriesId: parseInt(req.body.categoriesId),
            courseImage: req.files['courseImage'][0].path,
            price: req.body.price,
            isFree: req.body.isFree === 'true',
        }
        const course = await prisma.courses.create({
            data: courseData,

        });

        const information = await prisma.information.create({
            data: {
                coursesId: course.id,
                description: req.body.description
            }
        });

        return course;
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