const prisma = require("../utils/connection");
const BaseError = require("../error/base.error");



class EnrollmentService {

  async createEnrollment(data) {
    try {
      const enrollment = await prisma.enrollment.create({
        data
      });
      return enrollment;
    } catch (error) {
      throw BaseError.BadRequest("Enrollment yaratishda xatolik", error);
    }
  }

  async updateEnrollment(id, data) {
    try {
      const enrollment = await prisma.enrollment.update({
        where: { id },
        data
      });
      return enrollment;
    } catch (error) {
      throw BaseError.BadRequest("Enrollmentni yangilashda xatolik", error);
    }
  }

  async deleteEnrollment(id) {
    try {
      await prisma.enrollment.delete({
        where: { id },
      });
      return { message: "Enrollment muvaffaqiyatli o'chirildi" };
    } catch (error) {
      throw BaseError.BadRequest("Enrollmentni o'chirishda xatolik", error);
    }
  }

  async getEnrollmentes() {
    try {
      const enrollmentes = await prisma.enrollment.findMany();
      return enrollmentes;
    } catch (error) {
      throw BaseError.BadRequest("Juftlashuvlarni olishda xatolik", error);
    }
  }

  async getEnrollment(id) {
    try {
      const enrollment = await prisma.enrollment.findUnique({
        where: { id },
      });
      return enrollment;
    } catch (error) {
      throw BaseError.BadRequest("Juftlashuvni olishda xatolik", error);
    }
  }

}

module.exports = new EnrollmentService();
