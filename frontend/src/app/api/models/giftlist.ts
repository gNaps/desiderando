import { GiftlistUsersRoles } from "./giftlistUserRoles";
import { User } from "./user";

export interface Giftlist {
  id?: number;
  name?: string;
  public?: boolean;
  who?: boolean;
  what?: boolean;
  gifts?: any[];
  slug?: string;
  expiration?: Date;
  members?: GiftlistUsersRoles[];
  gifts_percentage?: number;
}
