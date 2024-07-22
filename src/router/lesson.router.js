const { Router } = require("express");
const {
  addLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {isAdmin} = require("../middlewares/users.middleware");

const lessonRouter = Router();

const route = "/lesson";

lessonRouter.post(`${route}`,addLesson);
lessonRouter.get(`${route}`, getLessons);
lessonRouter.put(`${route}/:id`,[authMiddleware ,isAdmin ], updateLesson);
lessonRouter.delete(`${route}/:id`,[authMiddleware ,isAdmin ], deleteLesson);

module.exports = lessonRouter;
