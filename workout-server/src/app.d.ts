import { Request as ExpressRequest } from 'express';
import User from './user/user.model';

export type Request = ExpressRequest & {
  user: User;
};
