import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewsletterRepo } from './newsletter.repo.ts';
import jwt from 'jsonwebtoken';

class RegisterInput {
  email: string;
}

export class NewsletterModel {
  email: string;
  created: Date;
  verified: boolean;
}

const secret = 'shhhhh';

@Controller()
export class AppController {
  constructor(private readonly repo: NewsletterRepo) {}

  @Get('/health')
  health() {
    return 'OK';
  }

  @Post('/register')
  async register(@Body() input: RegisterInput): Promise<NewsletterModel> {
    const res = await this.repo.create(input.email);

    // todo: generate verify token and send out as email
    const token = jwt.sign({ email: input.email }, secret);
    console.log('token', token);

    return res;
  }

  @Get('/verify/:token')
  async verify(@Param('token') token: string) {
    // validate verification token
    try {
      const decoded = jwt.verify(token, secret);
      console.log('success', decoded);

      const record = await this.repo.findOne(decoded.email);

      if (!record) {
        throw new Error('Record not found');
      }

      if (record.verified) {
        throw new Error('Record already verified');
      }

      // update record
      await this.repo.update(decoded.email, { verified: true });
    } catch (err) {
      // err
      console.error('err', err);
    }
    // find newsletter by email defined in token
    // validate and update newsletter record to verified: true
    return 'Verify';
  }
}
