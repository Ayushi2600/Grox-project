import appConfig from "@config/app.config";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import bcrypt from "bcrypt";

class UserFactory {
  static async createUser(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, appConfig.saltRounds);
    return {
      email: user.email,
      password: hashedPassword,
      isActive: false,
      emailVerified: false,
      createdAt: new Date()
    };
  }
  
  static async updateUser(user: UpdateUserDto) {

    const updateUser = {} as any;

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, appConfig.saltRounds);
      updateUser.password = hashedPassword;
    }

    if (user.firstName) { 
      updateUser.firstName = user.firstName;
    }
    if (user.lastName) {
      updateUser.lastName = user.lastName;
    }
    if (user.isActive) {
      updateUser.isActive = user.isActive;
    }
    if (user.emailVerified) {
      updateUser.emailVerified = user.emailVerified;
    }
    if (user.nationality) {
      updateUser.nationality = user.nationality;
    }
    if (user.phoneNumber) {
      updateUser.phoneNumber = user.phoneNumber;
    }
    if (user.countryCode) {
      updateUser.countryCode = user.countryCode;
    }
    return updateUser;
  }

  static async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default UserFactory;
