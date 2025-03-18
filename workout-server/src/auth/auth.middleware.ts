import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request } from '../app';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthUserMiddleware.name);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.authService.extractTokenFromRequest(req)) {
      next();
      return;
    }

    const payload = this.authService.extractTokenPayloadFromRequest(req);
    if (!payload) {
      next();
      return;
    }

    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      this.logger.warn(`User with ID ${payload.id} not found in the database.`);
      this.authService.clearTokenFromResponse(res);
    } else {
      req.user = user;
    }

    next();
  }
}
