import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  health() {
    return 'OK';
  }

  @Post('/register')
  register() {
    return 'Register';
  }

  @Get('/verify/:token')
  verify() {
    return 'Verify';
  }
}
