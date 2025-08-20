import { injectable } from "tsyringe";
import UserRepository from "../repository/user.repo";
import InvalidRequestError from "@shared/errors/invalid-request.error";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import UserFactory from "../factory/user.factory";
import { generateOTPCode } from "../helper/generate-code";
import OTPRepository from "../repository/otp.repository";

@injectable()
class UserOnboardingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OTPRepository
  ) {}

  async createUser(user: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new InvalidRequestError("User with email already exists");
    }

    const userData = await UserFactory.createUser(user);

    const newUser = await this.userRepository.createUser(userData);

    await this.sendUserOTPCode({ userId: newUser.id, type: "EMAIL" });

    return {
      message: "Please check your email for the verification code",
      data: {
        userId: newUser.id,
        email: newUser.email,
      },
    };
  }

  async verifyOTP(
    { type, code }: { type: string; code: string },
    userId: number
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidRequestError("User not found");
    }

    const findOTP = await this.otpRepository.findUserOTPByType(userId, type);
    if (!findOTP) {
      throw new InvalidRequestError("Invalid verification code");
    }

    // if (findOTP.expiry < new Date()) {
    //   throw new InvalidRequestError("OTP expired");
    // }

    if (findOTP.code !== code) {
      throw new InvalidRequestError("Invalid verification code");
    }

    const userData = await UserFactory.updateUser({
      isActive: true,
      emailVerified: true,
    });
    await this.userRepository.updateUser(userId, userData);

    return {
      message: "OTP verified successfully",
      success: true,
      data: {
        userId: userId,
        email: user.email,
      },
    };
  }

  async updateUser(userId: number, user: UpdateUserDto) {
    const findUser = await this.userRepository.findById(userId);
    if (!findUser) {
      throw new InvalidRequestError("User not found");
    }

    if (!findUser.emailVerified) {
      throw new InvalidRequestError(
        "User not verified, please verify your email first"
      );
    }

    const userData = await UserFactory.updateUser(user);
    const { password, ...rest } = await this.userRepository.updateUser(
      userId,
      userData
    );
    return { message: "User updated successfully", data: rest };
  }

  async regenerateOTP(email: string, type: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidRequestError("User with email not found");
    }

    if (user.emailVerified) {
      throw new InvalidRequestError("User with email already verified");
    }

    await this.sendUserOTPCode({ userId: user.id, type });

    return {
      message: "OTP resent successfully",
      data: {
        userId: user.id,
        email: user.email,
      },
    };
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidRequestError("User with username not found");
    }
    if (!user.isActive) {
      throw new InvalidRequestError("Invalid User");
    }
    return user;
  }

  async countRegisteredUsers() {
    // TODO: Replace with actual count from database
    // const totalUsers = await this.userRepository.countUsers();
    return {
      message: "Total registered users",
      data: {
        totalUsers: 51, // This is temporary, replace with actual count from database
      },
    };
  }

  async sendUserOTPCode({ userId, type }: { userId: number; type: string }) {
    const code = generateOTPCode().toString();

    const otpType: "EMAIL" | "PHONE" =
      type === "phoneNumber" ? "PHONE" : "EMAIL";

    const findOTP = await this.otpRepository.findUserOTPByType(userId, otpType);

    if (findOTP) {
      await this.otpRepository.updateOTPById(findOTP.id, code, otpType);
    } else {
      await this.otpRepository.createOTP(code, otpType, userId);
    }

    console.log(
      `Generated OTP for user ${userId} and type ${otpType}: ${code}`
    );
    // send code to user's email

    if (type?.toLowerCase() === "email") {
      // await this.emailService.sendEmail(user.email, 'OTP Verification', `Your OTP code is ${code}`);
    } else if (type?.toLocaleLowerCase() === "phonenumber") {
      // await this.smsService.sendSMS(user.phoneNumber, `Your OTP code is ${code}`);
    }
  }
}

export default UserOnboardingService;
