import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() fpDto: ForgotPasswordDto, @Res() res: Response) {
    console.log(fpDto);
    return this.authService.forgotPassword(fpDto, res);
  }
}
