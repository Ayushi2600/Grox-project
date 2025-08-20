// import { PrismaClient } from '@prisma/client';
import { Pagination } from './pagination';
import { IPaginationOptions } from './interfaces';

// const prisma = new PrismaClient();

export async function paginate<T>(
  model: { findMany: Function; count: Function },
  options: IPaginationOptions,
  findManyArgs: any = {},
): Promise<Pagination<T>> {
  const [page, size] = resolveOptions(options);

  const skip = (page - 1) * size;

  const [items, totalItems] = await Promise.all([
    model.findMany({
      ...findManyArgs,
      skip,
      take: Number(size),
    }),
    model.count({ where: findManyArgs.where }),
  ]);

  return createPaginationObject<T>(items, totalItems, page, size);
}

function createPaginationObject<T>(
  items: T[],
  totalItems: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(totalItems / limit);

  return new Pagination(items, {
    total: totalItems,
    perPage: Number(limit),
    totalPages,
    page,
  });
}

function resolveOptions(options: IPaginationOptions): [number, number] {
  const page = options.page < 1 ? 1 : options.page;
  const size = options.perPage;

  return [page, size];
}
