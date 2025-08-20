import { BaseRepository } from "@shared/repository/base.repository";
import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { CreateWaitlistDto } from "../dto/waitlist.dto";
import { PaginationQuery } from "@shared/types/pagination-query.type";

const prisma = new PrismaClient();

@injectable()
class WaitlistRepository extends BaseRepository {
  constructor() {
    super(prisma.waitlist);
  }

  async createWaitlist(waitlist: CreateWaitlistDto) {
    return this.save(waitlist);
  }

  async getWaitlist(query: PaginationQuery) {
    return this.findAllWithPagination({
      options: {
        page: query.page,
        perPage: query.perPage,
      },
    });
  }

  async getWaitlistById(id: number) {
    return this.findOne({ id });
  }

  async getWaitlistByEmail(email: string) {
    return this.findOne({ email });
  }
}

export default WaitlistRepository;