import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import generateRandomId from 'src/utils/generateRandomId';
import { UsersLogInDto, UsersSignUpDto } from './users.dto';
import * as EmailValidator from 'email-validator';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async signUp(dto: UsersSignUpDto, response: Response) {
    const { email, password, password2 } = dto;
    if (!EmailValidator.validate(email)) {
      throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
    }
    if (password !== password2) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    if (password.trim().length < 8) {
      throw new BadRequestException('비밀번호는 8자 이상이어야 합니다.');
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('이미 사용중인 이메일입니다.');
    }

    const data: Prisma.UserCreateInput = {
      id: generateRandomId(),
      email,
      encryptedPassword: await hash(password, 12),
    };

    const user = await this.prismaService.user.create({
      data,
      select: { id: true, email: true },
    });

    const accessToken = this.generateAccessToken(user);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 7200000,
    }); // 2시간 후 만료
    return { accessToken };
  }

  async logIn(dto: UsersLogInDto, response: Response) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, email: true, encryptedPassword: true },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const isCorrectPassword = await compare(password, user.encryptedPassword);
    if (!isCorrectPassword) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    const accessToken = this.generateAccessToken(user);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 7200000,
    });
    return { accessToken };
  }

  generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const secretKey = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
    const accessToken = sign(
      { email: user.email, accountType: 'user' },
      secretKey,
      {
        subject: user.id,
        expiresIn: '2h',
      },
    );

    return accessToken;
  }
}
