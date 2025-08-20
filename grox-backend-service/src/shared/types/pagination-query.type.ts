type ObjectLiteral = {
  [key: string]: any;
};

export type PaginationQuery = {
  perPage: number;
  page: number;
  search?: ObjectLiteral;
  where?: ObjectLiteral;
  status?: any;
};
