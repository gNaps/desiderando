import { GiftUsersBuyers } from "./giftUsersBuyers";

export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  where: string;
  category: number;
  status: string;
  slug: string;
  buyers: GiftUsersBuyers[];
  created_at?: string;
}
