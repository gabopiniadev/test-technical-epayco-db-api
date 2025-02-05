import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Virtual Wallet API')
      .setDescription('Documentación de los endpoints de la billetera virtual')
      .setVersion('1.0')
      .addTag('wallet')
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('api/db');

  await app.listen(4000);
  console.log(`Swagger está disponible en: http://localhost:4000/api-docs`);
  console.log(`El resto de los endpoints están en: http://localhost:4000/api/db`);
}
bootstrap();

