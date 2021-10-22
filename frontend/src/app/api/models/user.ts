export interface UserResponse {
  jwt: string;
  user: User;
}

export interface User {
  born_date?: Date | null;
  email?: string;
  icon_profile?: number;
  id?: number;
  sex?: string;
  username?: string;
}
