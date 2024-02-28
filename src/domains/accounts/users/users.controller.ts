import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersLogInDto, UsersSignUpDto } from './users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('sign-up')
  async signUp(@Body() dto: UsersSignUpDto, @Res() response: Response) {
    const accessToken = await this.usersService.signUp(dto, response);
    return response.send({ accessToken });
  }

  @Post('log-in')
  async logIn(@Body() dto: UsersLogInDto, @Res() response: Response) {
    const accessToken = await this.usersService.logIn(dto, response);
    return response.send({ accessToken });
  }
}
