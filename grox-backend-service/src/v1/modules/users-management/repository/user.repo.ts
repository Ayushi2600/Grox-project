import { BaseRepository } from "@shared/repository/base.repository";
import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

const prisma = new PrismaClient();

@injectable()
class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string) {
    return await this.findOne({ email });
  }

  async findByUsername(username: string) {
    return await this.findOne({ username });
  }

  async createUser(user: CreateUserDto) {
    return await this.save(user);
  }

  async updateUser(userId: number, user: UpdateUserDto) {
    return await this.updateById(userId, user);
  }

  async countUsers() {
    return await this.count({
      isActive: true,
    });
  }

  async findByPhoneNumber(countryCode: string, phoneNumber: string) {
    return await this.findOne({
      phoneNumber,
      countryCode,
    });
  }
}

export default UserRepository;
