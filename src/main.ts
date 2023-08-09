import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("Money management app API")
    // .setDescription("Your API Description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document, {
    jsonDocumentUrl: "api-docs",
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await setupSwagger(app);
  await app.listen(process.env.PORT || 8000);
}

bootstrap();
