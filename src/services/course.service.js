const BaseError = require("../error/base.error");
const prisma  = require("../utils/connection");
const fileService = require("./fileService");

class CourseService {
  async createcourse(data , file) {
    try {
      const fileName = fileService.save(file);
      data.photo = fileName
      const course = await prisma.course.create({
       data
      });
      return course;
    } catch (error) {
      throw BaseError.BadRequest('Course yaratishda xatolik' , error);
    }
  }

  async updatecourse(id, data) {
    try {
      const course = await prisma.course.update({
        where: { id },
        data,
      });
      return course;
    } catch (error) {
      console.log(error);
      throw BaseError.BadRequest('Courseni yangilashda xatolik' , error);
    }
  }

  async deletecourse(id) {
    try {
      await prisma.course.delete({
        where: { id }
      });
      return { message: 'Course muvaffaqiyatli o\'chirildi' };
    } catch (error) {
      throw  BaseError.BadRequest('Courseni o\'chirishda xatolik',error);
    }
  }

  async getcourses() {
    try {
      const courses = await prisma.course.findMany()
      return courses; 
    } catch (error) {
      throw BaseError.BadRequest("Courselarni olishda xatolik" , error);
    }
  }
  
}

module.exports =new CourseService;
