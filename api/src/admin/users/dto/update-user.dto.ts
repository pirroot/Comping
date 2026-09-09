import { Role } from 'src/common/types/auth-user.type';

export class UserUpdateDto {
  emailVerified: boolean;
  role: Role.USER;
  isActive: boolean;
  isDeleted: boolean;
}
