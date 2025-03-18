import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request } from '../app';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // empty
  }

  @Post('register')
  register(@Body() body: AuthDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.register(body, response);
  }

  @Post('login')
  login(@Body() body: AuthDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(body, response);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Req() request: Request) {
    return this.authService.verify(request);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return this.authService.logout(request, response);
  }
}
