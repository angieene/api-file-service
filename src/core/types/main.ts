import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity;
}

export interface IPositiveRequest {
  success: boolean;
}

export interface TODO_ANY {
  [name: string]: any;
}
