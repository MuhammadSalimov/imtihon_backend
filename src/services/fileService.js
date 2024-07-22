const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class FileServer {
  save(file) {
    try {
      const fileName = uuidv4() + `.${file.mimetype.split("/")[1]}`;
      const curretDir = __dirname;
      const staticDir = path.join(curretDir, "..", "static");
      const filePath = path.join(staticDir, fileName);

      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }
      file.mv(filePath);
      return fileName;
    } catch (error) {
      throw new Error({ message: error.message });
    }
  }
}

module.exports = new FileServer();