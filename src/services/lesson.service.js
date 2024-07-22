const prisma = require("../utils/connection");
const BaseError = require("../error/base.error");
const fileService = require("./fileService");
class LessonService {

  async addLesson(data , video) {
    try {
      const fileName = fileService.save(video);
      data.video = fileName
      const lesson = await prisma.lesson.create({
        data,
      });
      return lesson;
    } catch (error) {
      console.log(error);
      throw BaseError.BadRequest("Lesson qo'shishda xatolik", error);
    }
  }

  async updateLesson(id, data) {
    try {
      const lesson = await prisma.lesson.update({
        where: { id },
        data,
      });
      return lesson;
    } catch (error) {
      throw BaseError.BadRequest("Lessonni yangilashda xatolik", error);
    }
  }

  async deleteLesson(id) {
    try {
      await prisma.lesson.delete({
        where: { id },
      });
      return { message: "Lesson muvaffaqiyatli o'chirildi" };
    } catch (error) {
      throw BaseError.BadRequest("Lessonni o'chirishda xatolik", error);
    }
  }

  async getLessons() {
    try {
      const lessons = await prisma.lesson.findMany();
      return lessons;
    } catch (error) {
      throw BaseError.BadRequest("Lessonlarni olishda xatolik", error);
    }
  }

}

module.exports = new LessonService();
