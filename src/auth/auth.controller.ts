import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';

interface AuthenticatedRequest extends Request {
  user?: any;
}

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req: Request) {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    res.redirect(process.env.HOME_REDIRECT);

    return res.status(HttpStatus.OK);
  }
}
