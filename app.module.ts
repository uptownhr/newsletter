import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { NewsletterRepo } from './newsletter.repo.ts';

@Module({ controllers: [AppController], providers: [NewsletterRepo] })
export class AppModule {}
