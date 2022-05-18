import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { isUUID } from '@nestjs/common/utils/is-uuid';

export const Id = createParamDecorator((key: string, ctx: ExecutionContext) => {
  if (!key) {
    key = 'id';
  }
  const request = ctx.switchToHttp().getRequest();
  const id = request.params[key] || request.query[key];
  if (!Number.isInteger(+id) || +id < 1) {
    throw new BadRequestException({ message: `${key} is invalid` });
  }
  return +id;
});

export const Uuid = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    if (!key) {
      key = 'id';
    }
    const request = ctx.switchToHttp().getRequest();
    const id = request.params[key] || request.query[key];
    if (!isUUID(id)) {
      throw new BadRequestException({ message: `${key} is invalid` });
    }
    return id;
  },
);
