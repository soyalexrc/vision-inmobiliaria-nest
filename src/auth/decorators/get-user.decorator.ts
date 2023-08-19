import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (!user) throw new InternalServerErrorException('No se encontro usuario en el request!');
  if (!user.isActive)
    throw new InternalServerErrorException({
      error: true,
      title: `Este usuario se encuentra deshabilitado`,
      message: `Por favor comuniquese con el administrador para poder ingresar de nuevo.`,
    });

  return user;
});
