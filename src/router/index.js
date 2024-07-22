const authRouter = require("./auth.router");
const courseRouter = require("./course.router");
const lessonRouter = require("./lesson.router");
const enrollmentRouter = require("./enrollment.router");

module.exports = [authRouter, enrollmentRouter, courseRouter, lessonRouter];
