import { injectable } from "tsyringe";
import UserRepository from "../../users-management/repository/user.repo";
import EmailService from "@shared/service/email.service";
import jwt from "jsonwebtoken";
import appConfig from "@config/app.config";
import InvalidRequestError from "@shared/errors/invalid-request.error";
import { User } from "@prisma/client";
import UserFactory from "../../users-management/factory/user.factory";
import UserOnboardingService from "@v1/modules/users-management/service/user-onboarding.service";
import axios from "axios";
import crypto from "crypto";

@injectable()
class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly userService: UserOnboardingService
  ) {}

  async resetPassword({
    email,
    phoneNumber,
    countryCode,
  }: {
    email?: string;
    phoneNumber?: string;
    countryCode?: string;
  }) {
    let user: User | null = null;

    if (email) {
      user = await this.userRepository.findByEmail(email);
    } else if (phoneNumber) {
      user = await this.userRepository.findByPhoneNumber(
        countryCode || "+234",
        phoneNumber
      );
    } else {
      throw new InvalidRequestError("Invalid email or phone number");
    }

    if (!user) {
      console.log("user is not found");
      throw new InvalidRequestError("Invalid email or phone number");
    }
    if (!user.isActive) {
      console.log("user is not active");
      throw new InvalidRequestError("Invalid email or phone number");
    }

    if (email) {
      const resetPasswordToken = jwt.sign({ email }, appConfig.jwtSecret, {
        expiresIn: "15m",
      });
      const resetPasswordLink = `${appConfig.app.frontendUrl}/reset-password?token=${resetPasswordToken}`;

      await this.emailService.sendEmail(
        user.email,
        "Reset Password",
        resetPasswordLink
      );
    } else {
      await this.userService.sendUserOTPCode({
        userId: user.id,
        type: "phoneNumber",
      });
    }

    return {
      message: "Reset password sent",
      data: {
        ...(email ? { email } : {}),
        ...(phoneNumber ? { countryCode, phoneNumber, userId: user.id } : {}),
      },
    };
  }

  async changePassword({
    token,
    password,
    verifyPassword,
  }: {
    token: string;
    password: string;
    verifyPassword: string;
  }) {
    const decoded = jwt.verify(token, appConfig.jwtSecret) as {
      email: string;
      type: string;
    };
    if (!decoded) {
      throw new InvalidRequestError("Invalid token");
    }

    const user = await this.userRepository.findByEmail(decoded.email);
    if (!user) {
      throw new InvalidRequestError("Invalid token");
    }

    if (password !== verifyPassword) {
      throw new InvalidRequestError("Passwords do not match");
    }

    // make sure the new password is not same as before
    const isPasswordCorrect = await UserFactory.comparePassword(
      password,
      user.password
    );
    if (isPasswordCorrect) {
      throw new InvalidRequestError("Use another password.");
    }

    const updatedUserData = await UserFactory.updateUser({ password });
    await this.userRepository.updateUser(user.id, updatedUserData);

    return {
      message: "Password changed successfully",
    };
  }

  async validateOTP({ otp }, userId: number) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user)
        throw new InvalidRequestError("This user is not a valid user.");
      const fetchOtp = await this.userService.verifyOTP(
        {
          type: "PHONE",
          code: otp,
        },
        userId
      );

      const tokenData = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, appConfig.jwtSecret, {
        expiresIn: "1h",
      });

      if (fetchOtp.success) {
        return {
          message: "OTP validated successfully.",
          data: {
            token,
            user: {
              id: user.id,
              email: user.email,
            },
          },
        };
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      throw error;
    }
  }

  async getSumsubAccessToken(userId: string): Promise<string | null> {
    const ts = Math.floor(Date.now() / 1000);
    const method = "POST";
    const urlPath = "/resources/accessTokens/sdk";
    const body = JSON.stringify({
      userId,
      levelName: "id-and-liveness",
      ttlInSecs: 600,
    });

    const signature = crypto
      .createHmac("sha256", process.env.SUMSUB_SECRET_KEY!)
      .update(ts + method + urlPath + body)
      .digest("hex");

    try {
      const response = await axios.post<{ token: string }>(
        `${process.env.API_BASE}${urlPath}`,
        JSON.parse(body),
        {
          headers: {
            "Content-Type": "application/json",
            "X-App-Token": process.env.SUMSUB_API_TOKEN,
            "X-App-Access-Ts": ts.toString(),
            "X-App-Access-Sig": signature,
          },
        }
      );

      return response.data.token;
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      return null;
    }
  }
}

export default AuthService;
