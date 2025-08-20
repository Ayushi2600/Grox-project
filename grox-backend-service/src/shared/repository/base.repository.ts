// base.repository.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { ObjectLiteral } from "@shared/types/object-literal.type";
import { IPaginationOptions } from "@shared/utils/pagination/interfaces";
import { Pagination } from "@shared/utils/pagination/pagination";

/**
 * A generic base repository that wraps a Prisma model delegate.
 */

export class BaseRepository {
  protected readonly model: {
    findUnique: Function;
    findFirst: Function;
    findMany: Function;
    create: Function;
    update: Function;
    count: Function;
  };

  constructor(model: any) {
    this.model = model;
  }

  async findById(id: string | number, include: ObjectLiteral = {}): Promise<any> {
    return this.model.findUnique({
      where: { id },
      include,
    });
  }

  async findOne(where: ObjectLiteral, include: ObjectLiteral = {}): Promise< any> {
    return this.model.findFirst({
      where,
      include,
    });
  }

  async findAll(where: ObjectLiteral = {}, include: ObjectLiteral = {}): Promise<any> {
    return this.model.findMany({
      where,
      include,
    });
  }

  async findAllWithPagination({
    where = {},
    include = {},
    options,
  }: {
    where?: ObjectLiteral;
    include?: ObjectLiteral;
    options?: IPaginationOptions;
  }
  ): Promise<Pagination<any>> {
    const [page, size] = this.resolveOptions(options ?? { page: 1, perPage: 10 });
    const skip = (page - 1) * size;
  
    const [items, totalItems] = await Promise.all([
      this.model.findMany({
        where,
        include,
        skip,
        take: size,
      }),
      this.model.count({ where }),
    ]);
  
    return this.createPaginationObject(items, totalItems, page, size);
  }
  
  private resolveOptions(options: IPaginationOptions): [number, number] {
    const page = options.page < 1 ? 1 : options.page;
    const size = options.perPage;
    return [page, size];
  }
  
  private createPaginationObject<T>(
    items: T[],
    totalItems: number,
    page: number,
    limit: number,
  ): Pagination<T> {
    const totalPages = Math.ceil(totalItems / limit);
  
    return new Pagination(items, {
      total: totalItems,
      perPage: limit,
      totalPages,
      page,
    });
  }

  async save(data: ObjectLiteral, tx?: Prisma.TransactionClient): Promise<any> {
    const client = (tx ?? this.model) as typeof this.model;
    return client.create({ data });
  }

  async updateById(
    id: string | number,
    data: ObjectLiteral,
    tx?: Prisma.TransactionClient
  ): Promise<any> {
    const client = (tx ?? this.model) as typeof this.model;
    return client.update({
      where: { id },
      data,
    });
  }

  async count(where: ObjectLiteral = {}): Promise<number> {
    return this.model.count({
      where,
    });
  }

}
