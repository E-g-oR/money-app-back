import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8000);
  /**
   * TODO add charts for account:
   * 1. income - expense for selected period,
   * 2. endpoint for chart filters
   */
}

bootstrap();
