import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/db';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Virtual Wallet API')
    .setDescription('Documentación de los endpoints de la billetera virtual')
    .setVersion('1.0')
    .addTag('wallet')
    .build();

  let document = SwaggerModule.createDocument(app, config);

  document = {
    ...document,
    paths: Object.keys(document.paths).reduce((acc, currentPath) => {
      const newPath = currentPath.startsWith(`/${globalPrefix}`)
        ? currentPath
        : `/${globalPrefix}${currentPath}`;

      acc[newPath] = document.paths[currentPath];
      return acc;
    }, {}),
  };

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4000);

  console.log(`Swagger está disponible en: http://localhost:4000/api-docs`);
  console.log(`Los endpoints están accediéndose en: http://localhost:4000/${globalPrefix}`);

}
bootstrap();

