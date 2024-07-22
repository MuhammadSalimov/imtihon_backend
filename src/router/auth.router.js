const { Router } = require("express");
const authController = require("../auth/auth.controller");
const { body } = require("express-validator");
const authRouter = Router();

const route = "/auth";

authRouter.post(
  `${route}/register`,
  body("password").isString({}),
  body("phone").isString({}),
  authController.register
);

authRouter.post(
  `${route}/login`,
  body("password").isString({}),
  body("phone").isString({}),
  authController.login
);

authRouter.post(`${route}/logout`, authController.logout);
authRouter.get(`${route}/refresh`, authController.refresh);

module.exports = authRouter;
