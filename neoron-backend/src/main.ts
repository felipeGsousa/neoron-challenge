import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FlightModule } from './flight/flight.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://localhost:5173',
    ],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
