const BaseError = require("../error/base.error")

class ControllerMiddlewares{
  isAdmin (req , __ , next){
    try {
      const {role} = req.user
    if(!(role =='admin')) return next(BaseError.BadRequest("" , "role is not admin"))
    next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ControllerMiddlewares