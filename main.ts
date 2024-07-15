import { NestFactory } from '@nestjs/core';
import '@nestjs/platform-express';
import { AppModule } from './app.module.ts';

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const app = await NestFactory.create(AppModule);

  app.listen(3000);
}
