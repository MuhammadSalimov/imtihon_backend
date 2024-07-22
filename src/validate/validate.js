const Joi = require("joi");

class JoiValidate {
  userValidate(data) {
    const check = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(5).required(),
      role :Joi.string().valid("user","teacher", "admin").required(),
      isActive:Joi.boolean()
    });
    const result = check.validate(data);
    return result;
  }

  courseValidate(data) {
    const check = Joi.object({
      title: Joi.string().min(5).required(),
      description: Joi.string().min(5).required(),
    });
    const result = check.validate(data);
    return result;
  }

  lessonValidate(data) {
    const check = Joi.object({
      title: Joi.string().min(5).required(),
      courseId: Joi.string().required(),
    });
    const result = check.validate(data);
    return result;
  }

  enrolmentValidate(data) {
    const check = Joi.object({
      userId: Joi.string().min(5).required(),
      courseId: Joi.string().min(5).required(),
      courseId: Joi.string().required(),
    });
    const result = check.validate(data);
    return result;
  }
}

module.exports = new JoiValidate();
