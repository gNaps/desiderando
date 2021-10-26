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
}
