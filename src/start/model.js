const cookieParser = require("cookie-parser");
const router = require("../router");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("../middlewares/error.middleware");
const cors = require("cors");
const { addAdmin } = require("../auth/auth.controller");

const model = (app, express) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  
  app.use(fileUpload({}));
  app.use(express.static("static"));

  app.use("/api", [router]);
  addAdmin();
  app.use(errorMiddleware);
};

module.exports = model;
