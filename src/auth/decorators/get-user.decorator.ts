import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  console.log('here', user);
  if (!user) throw new InternalServerErrorException('No se encontro usuario en el request!');
  if (!user.isActive)
    throw new InternalServerErrorException('Este usuario se encuentra deshabilitado, por favor comuniquese con el administrador.');

  return user;
});
