import InvalidRequestError from "@shared/errors/invalid-request.error";
import UserFactory from "@v1/modules/users-management/factory/user.factory";
import UserRepository from "@v1/modules/users-management/repository/user.repo";
import { injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import appConfig from "@config/app.config";
import EmailService from "@shared/service/email.service";

@injectable()
class LoginService {

  constructor(private readonly userRepository: UserRepository, private readonly emailService: EmailService) { }
  async login({ email, password }: { email: string, password: string }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidRequestError("Invalid email or password");
    }

    if (!user.isActive) {
      throw new InvalidRequestError("Invalid email or password");
    }

    const isPasswordCorrect = await UserFactory.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new InvalidRequestError("Invalid email or password");
    }

    const tokenData = {
      userId: user.id
    }

    const token = jwt.sign(tokenData, appConfig.jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(tokenData, appConfig.jwtSecret, { expiresIn: '8h' });
    return {
      message: "Login successful",
      data: {
        accessToken: token,
        refreshToken: refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      }
    };
  }

}

export default LoginService;
