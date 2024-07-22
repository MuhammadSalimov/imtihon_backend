const express = require("express");
const app = express();

require("./start/runner")(app);
require("./start/model")(app, express);