const { Router } = require("express");
const {
  createEnrollment,
  getEnrollmentes,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require("../controllers/Enrollment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {isAdmin} = require("../middlewares/users.middleware");

const enrollmentRouter = Router();

const route = "/enrollment";

enrollmentRouter.post(`${route}`, createEnrollment);
enrollmentRouter.get(`${route}`,[authMiddleware,isAdmin], getEnrollmentes);
enrollmentRouter.get(`${route}/:id`,[authMiddleware,isAdmin], getEnrollment);
enrollmentRouter.put(`${route}/:id`,[authMiddleware,isAdmin], updateEnrollment);
enrollmentRouter.delete(`${route}/:id`,[authMiddleware,isAdmin], deleteEnrollment);

module.exports = enrollmentRouter;
