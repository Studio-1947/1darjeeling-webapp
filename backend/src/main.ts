import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*', // Allow all origins for dev, restrict in prod
  });

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  
  console.log(`🚀 NestJS Backend server running on http://localhost:${PORT}`);
}

bootstrap();
