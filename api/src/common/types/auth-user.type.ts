export type AuthUser = {
  id: string;
  phone: string | null;
  role: Role;
};

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}
