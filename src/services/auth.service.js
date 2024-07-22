
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const BaseError = require("../error/base.error");
const prisma = require("../utils/connection");
const UserDto = require("../dto/user.dto")
class AuthService {

  async register(phone, password , name) {

    const existUser = await prisma.user.findUnique({where:{phone}});
  
    if (existUser) throw BaseError.BadRequest("phone already exist");

    const hashedPass = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data:{
        phone,
        password:hashedPass,
        name:name
      }
    })

    const userDto =new UserDto(user)
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { user: user, ...tokens };
  }


  async login(phone, password) {
    const user = await prisma.user.findUnique({where:{phone}})
    
    if (!user) {
     throw BaseError.BadRequest("User is not defined");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (! isPassword) throw BaseError.BadRequest("password is incorrect");

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: user, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
     return BaseError.UnauthorizedError("Bad authorization");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);

    if (!userPayload || !tokenDb) {
    return  BaseError.UnauthorizedError("Bad authorization");
    }

    const user = await prisma.user.findFirst({where:{id:userPayload.id}})

    const userDto = new UserDto(user);

    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
