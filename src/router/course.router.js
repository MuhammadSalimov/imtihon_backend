const { Router } = require("express");
const courseController = require("../controllers/course.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/users.middleware");
const courseRouter = Router();

const route = "/course";

courseRouter.post(`${route}`, [authMiddleware, isAdmin], courseController.createcourse);
courseRouter.get(`${route}`, courseController.getcourses);
courseRouter.put(`${route}/:id`, [authMiddleware, isAdmin], courseController.updatecourse);
courseRouter.delete(`${route}/:id`, [authMiddleware, isAdmin], courseController.deletecourse);

module.exports = courseRouter;
