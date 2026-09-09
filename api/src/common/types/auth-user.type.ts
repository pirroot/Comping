export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

export enum Role {
  USER,
  ADMIN,
  MODERATOR,
}
