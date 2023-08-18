import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    console.log(user);

    if (!user) throw new BadRequestException('User not found');
    if (!user.isActive)
      throw new ForbiddenException({
        message: 'Este usuario se encuentra deshabilitado, por favor comuniquese con el administrador.',
        success: false,
        error: true,
      });

    if (validRoles.includes(user.userType)) {
      return true;
    }

    throw new ForbiddenException(`User ${user.username} need a valid role: [${validRoles}]`);
  }
}
