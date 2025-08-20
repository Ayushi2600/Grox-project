export type CreateUserDto = {
  email: string;
  password: string;
};

export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  password?: string;
  emailVerified?: boolean;
  nationality?: string;
  phoneNumber?: string;
  countryCode?: string;
  
};