import { BaseRepository } from "@shared/repository/base.repository";
import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const OTP_EXPIRY_TIME = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

@injectable()
class OTPRepository extends BaseRepository {
  constructor() {
    super(prisma.oTP);
  }

  async createOTP(otp: string, type: string, userId: number) {
    const expiry = new Date(Date.now() + 1000 * 60 * 10);
    return await this.save({
      code: otp,
      type,
      userId,
      expiry
    });
  }

  async updateOTPById(id: number, otp: string, type: string) {
    const expiry = new Date(Date.now() + 1000 * 60 * 10);
    return await this.updateById(id, {
      code: otp,
      type, 
      expiry
    });
  }

  async findUserOTPByType(userId: number, type: string) {
    return await this.findOne({
      userId,
      type,
    });
  }

}

export default OTPRepository;
