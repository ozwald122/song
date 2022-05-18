import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaRepository } from './prisma/prisma.repository';
import { EnvironmentSwagger } from './swaggers/environment-swagger';
import { ValidationException } from './core/exceptions/validation.exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  new EnvironmentSwagger(app).buildDocuments();
  const prismaRepository: PrismaRepository = app.get(PrismaRepository);
  prismaRepository.enableShutdownHooks(app);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
