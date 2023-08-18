import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from '../interfaces/roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export const Auth = (...roles: Roles[]) => {
  return applyDecorators(RoleProtected(...roles), UseGuards(AuthGuard('jwt'), UserRoleGuard));
};
