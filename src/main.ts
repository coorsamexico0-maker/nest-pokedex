import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Usa process.env.PORT para Render, fallback 3001 para local
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' necesario para Render
  console.log(`App running on port ${port}`);
}

bootstrap();
