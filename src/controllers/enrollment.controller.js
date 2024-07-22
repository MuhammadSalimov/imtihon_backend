const enrollmentService = require('../services/enrollment.service');
const {enrolmentValidate} = require("../validate/validate")

class EnrollmentController {
  
  async createEnrollment(req, res , next) {
    try {
      const {error} = enrolmentValidate(req.body) 
      if (error) throw BaseError.BadRequest("validation errors", error.message);
      
      const enrollment = await enrollmentService.createEnrollment(req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      next(error)
    }
  }

  async updateEnrollment(req, res , next) {
    const { id } = req.params;
    try {
      const enrollment = await enrollmentService.updateEnrollment(id, req.body);
      res.status(200).json(enrollment);
    } catch (error) {
      next(error)
    }
  }

  async deleteEnrollment(req, res , next) {
    const { id } = req.params;
    try {
      const result = await enrollmentService.deleteEnrollment(id);
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async getEnrollmentes(req, res , next) {
    try {
      const enrollmentes = await enrollmentService.getEnrollmentes();
      res.status(200).json(enrollmentes);
    } catch (error) {
      next(error)
    }
  }

  async getEnrollment(req, res , next) {
    const { id } = req.params;
    try {
      const enrollment = await enrollmentService.getEnrollment(id);
      res.status(200).json(enrollment);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new EnrollmentController();
