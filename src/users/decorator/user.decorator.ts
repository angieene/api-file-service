import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IExpressRequest, TODO_ANY } from 'src/core/types/main';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<IExpressRequest>();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});

// export const User = createParamDecorator(
//   (_: unknown, ctx: ExecutionContext) => {
//     const request: TODO_ANY = ctx.switchToHttp().getRequest();

//     return request.user;
//   },
// );
