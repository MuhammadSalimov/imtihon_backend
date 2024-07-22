const BaseError = require("../error/base.error");
const lessonService = require("../services/lesson.service");
const { lessonValidate } = require("../validate/validate");

class LessonController {

  async addLesson(req, res, next) {
    try {
      const {error} = lessonValidate(req.body) 
      if (error) throw BaseError.BadRequest("validation errors", error.message);

      const Lesson = await lessonService.addLesson(req.body  , req.files?.video);
      res.status(201).json(Lesson);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateLesson(req, res, next) {
    const { id } = req.params;
    try {
      const Lesson = await lessonService.updateLesson(id, req.body);
      res.status(200).json(Lesson);
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(req, res, next) {
    const { id } = req.params;
    try {
      const result = await lessonService.deleteLesson(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getLessons(req, res, next) {
    try {
      const Lessons = await lessonService.getLessons();
      res.status(200).json(Lessons);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LessonController();
