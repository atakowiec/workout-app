import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AuthDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { AuthResponse } from '@shared/auth';
import { TokenPayload } from './auth';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from '../app';

@Injectable()
export class AuthService {
  readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    // empty
  }

  public async register(authDto: AuthDto, response: Response): Promise<AuthResponse> {
    if (await this.userService.findOneByUsername(authDto.username)) {
      this.logger.warn(`Trying to register duplicated user with username: ${authDto.username}`);
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    authDto.password = await this.hashPassword(authDto.password);

    const user = await this.userService.saveUser(authDto);

    this.appendJwtTokenToCookie(response, user);

    this.logger.log(`User registered: ${user.username}`);

    return { id: user.id, username: user.username };
  }

  public async login(authDto: AuthDto, response: Response): Promise<AuthResponse> {
    const user = await this.userService.findOneByUsername(authDto.username);

    if (!user || !(await this.comparePasswords(authDto.password, user.password))) {
      this.logger.warn(`Invalid credentials for user: ${authDto.username}`);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    this.appendJwtTokenToCookie(response, user);

    this.logger.log(`User logged in: ${user.username}`);

    return { id: user.id, username: user.username };
  }

  public async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  public async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  public generateJwtToken(tokenPayload: TokenPayload) {
    return this.jwtService.sign({
      id: tokenPayload.id,
      username: tokenPayload.username,
    } as TokenPayload);
  }

  public appendJwtTokenToCookie(response: Response, tokenPayload: TokenPayload) {
    response.cookie('access_token', this.generateJwtToken(tokenPayload), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
      httpOnly: true,
      secure: false,
    });
  }

  public extractTokenFromRequest(request: Request) {
    return request?.cookies?.access_token;
  }

  public extractTokenPayloadFromRequest(request: Request) {
    return this.jwtService.verify(request.cookies.access_token);
  }

  clearTokenFromResponse(res: Response) {
    res.clearCookie('access_token');
  }

  verify(request: Request) {
    if (request.user) {
      this.logger.log(`User [ID:${request.user.id}] ${request.user.username} verified`);
    }

    return {
      id: request.user.id,
      username: request.user.username,
    };
  }
}
