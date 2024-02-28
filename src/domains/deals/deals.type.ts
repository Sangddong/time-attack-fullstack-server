import { Prisma, User } from '@prisma/client';

export type CreateDeal = {
  title: string;
  content: string;
  imgURL: string;
  price: number;
  location: string;
};

export type UpdateDeal = {
  title?: string;
  content?: string;
  imgURL?: string;
  price?: number;
  location?: string;
};
