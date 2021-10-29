import { Giftlist } from "./giftlist";
import { GiftUsersBuyers } from "./giftUsersBuyers";
import { User } from "./user";

export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  where: string;
  category: number;
  status: string;
  slug: string;
  buyers: User[];
  created_at?: string;
  giftlist: Giftlist;
  created_by: User;
}
