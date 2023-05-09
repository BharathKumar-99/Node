const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports.dashboardApi = async function (req) {
    try {
        const users = await prisma.user.count();
        const user = await prisma.user.findMany();
        const courses = await prisma.courses.count();
        const course = await prisma.courses.findMany();
        const instructors = await prisma.instructor.count();
        const instructor = await prisma.instructor.findMany();
        const organizations = await prisma.organization.count();
        const organization = await prisma.organization.findMany();
        const latestCourses = await prisma.courses.findMany({
            orderBy: {
                id: 'desc',
            },
            take: 5,
        })

        return {
            "data": {
                "usersCount": users,
                "coursesCount": courses,
                "instructorsCount": instructors,
                "organizationCount": organizations,
                "users": user,
                "instructor": instructor,
                "courses": course,
                "organization": organization,
                "latestCourses": latestCourses


            },
            "message": "Data Found"
        };
    } catch (e) {
        console.log(e);
        return JSON.stringify(e)
    }
}