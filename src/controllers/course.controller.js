const BaseError = require('../error/base.error');
const courseService = require('../services/course.service');
const {courseValidate} = require("../validate/validate")

class CourseController {

  async createcourse(req, res ,next) {
    try {
      const {error} = courseValidate(req.body) 
      if (error) throw BaseError.BadRequest("validation errors", error.message);
      const course = await courseService.createcourse(req.body ,req.files?.photo );
      res.status(201).json(course);
    } catch (error) {
      next(error)
    }
  }

  async updatecourse(req, res , next) {
    const { id } = req.params;
    try {
      const course = await courseService.updatecourse(id, req.body);
      res.status(200).json(course);
    } catch (error) {
     next(error)
    }
  }

  async deletecourse(req, res , next) {
    const { id } = req.params;
    try {
      const result = await courseService.deletecourse(id);
      res.status(200).json(result);
    } catch (error) {
     next(error)
    }
  }

  async getcourses(req, res , next) {
    try {
      const courses = await courseService.getcourses();
      res.status(200).json(courses);
    } catch (error) {
     next(error)
    }
  }

}

module.exports = new CourseController();
