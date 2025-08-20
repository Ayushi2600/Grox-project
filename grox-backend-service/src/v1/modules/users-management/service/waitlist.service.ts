import { injectable } from "tsyringe";
import WaitlistRepository from "../repository/waitlist.repo";
import { CreateWaitlistDto } from "../dto/waitlist.dto";
import InvalidRequestError from "@shared/errors/invalid-request.error";
import UserRepository from "@v1/modules/users-management/repository/user.repo";
import { PaginationQuery } from "@shared/types/pagination-query.type";

@injectable()
class WaitlistService {

  constructor(private readonly waitlistRepository: WaitlistRepository, private readonly userRepository: UserRepository) { }

  async addToWaitlist(waitlist: CreateWaitlistDto) {
    const existingWaitlist = await this.waitlistRepository.getWaitlistByEmail(waitlist.email);
    if (existingWaitlist) {
      throw new InvalidRequestError("Email already exists. ");
    }

    const existingUser = await this.userRepository.findByEmail(waitlist.email);
    if (existingUser) {
      throw new InvalidRequestError("Email already exists. ");
    }

    const newWaitlistUser = await this.waitlistRepository.createWaitlist(waitlist);

    return {
      message: "User added to waitlist successfully",
      data: newWaitlistUser,
    };
  }

  async getWaitlist(query: PaginationQuery) {
    const waitlist = await this.waitlistRepository.getWaitlist(query);
    return {
      message: "Waitlist fetched successfully",
      data: waitlist,
    };
  }

  async getWaitlistById(id: number) {
    return this.waitlistRepository.getWaitlistById(id);
  }

}

export default WaitlistService;