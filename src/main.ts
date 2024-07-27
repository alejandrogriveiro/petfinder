import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Pets Finder')
    .setDescription('No pierdas a tu mascota')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'token', // This name will be used to reference this security scheme
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  document.tags = [
    { name: 'Auth', description: 'Gestión de autenticación' },
    { name: 'Users', description: 'Gestión de usuarios' },
    { name: 'Pets', description: 'Gestión de mascotas' },
  ];
  SwaggerModule.setup('api', app, document, {
    //jsonDocumentUrl: 'swagger/json',
  });
  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`Web running on http://localhost:${process.env.PORT}`);
  logger.log(`Swagger running on http://localhost:${process.env.PORT}/api`);
}
bootstrap();
