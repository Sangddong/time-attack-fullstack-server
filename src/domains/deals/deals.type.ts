export type CreateDeal = {
  userId: string;
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
