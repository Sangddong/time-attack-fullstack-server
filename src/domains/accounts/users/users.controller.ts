import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersLogInDto, UsersSignUpDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('accounts/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('sign-up')
  async signUp(@Body() dto: UsersSignUpDto) {
    const accessToken = await this.usersService.signUp(dto);

    return { accessToken };
  }

  @Post('log-in')
  async logIn(@Body() dto: UsersLogInDto, @Res() res: Response) {
    const accessToken = await this.usersService.logIn(dto);
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //1 day
    });
    return { accessToken };
  }
}
