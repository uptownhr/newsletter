import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewsletterRepo } from './newsletter.repo.ts';

class RegisterInput {
  email: string;
}

@Controller()
export class AppController {
  constructor(private readonly repo: NewsletterRepo) {}

  @Get('/health')
  health() {
    return 'OK';
  }

  @Post('/register')
  async register(@Body() input: RegisterInput) {
    const res = await this.repo.create(input.email);
    return 'Register';
  }

  @Get('/verify/:token')
  verify() {
    return 'Verify';
  }
}
