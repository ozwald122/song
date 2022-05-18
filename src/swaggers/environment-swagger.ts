import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class EnvironmentSwagger {
  private document: OpenAPIObject;
  constructor(private app) {}

  buildDocuments() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const config = new DocumentBuilder()
      .setTitle('Document for Faktory')
      .setDescription('The Faktory API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    this.document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, this.document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
