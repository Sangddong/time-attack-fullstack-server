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
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as EmailValidator from 'email-validator';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async signUp(dto: UsersSignUpDto) {
    const { email, password } = dto;
    if (!email || !password) throw new Error('모든 항목을 작성해주세요.');
    const isEmail = EmailValidator.validate(email);
    if (!isEmail) throw new Error('이메일 형식이 올바르지 않습니다.');
    if (password.trim().length < 8)
      throw new Error('비밀번호는 8자 이상이어야 합니다.');

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

    return accessToken;
  }

  async logIn(dto: UsersLogInDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, email: true, encryptedPassword: true },
    });
    if (!user) throw new NotFoundException('No user found');

    const isCorrectPassword = compare(password, user.encryptedPassword);
    if (!isCorrectPassword) throw new BadRequestException('Incorrect password');

    const accessToken = this.generateAccessToken(user);

    return accessToken;
  }

  generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const { id: subject, email } = user;
    const secretKey = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
    const accessToken = sign({ email, accountType: 'user' }, secretKey, {
      subject,
      expiresIn: '2h',
    });

    return accessToken;
  }
}
