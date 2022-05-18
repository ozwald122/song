import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import {
  INestApplication,
  Type,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as request from 'supertest';
import './supertest.helper';
import { DatabaseHelper } from './database.helper';
import { isObject, uniq } from 'lodash';
import { PrismaRepository } from 'src/prisma/prisma.repository';
import { ValidationException } from '../exceptions/validation.exception';
export class TestHelper {
  public app: INestApplication;
  public httpService: any;
  public address: any;
  private moduleFixture: TestingModule;
  private testHelperModules: { [_: string]: any } = {};
  private databaseHelper = new DatabaseHelper();
  public prismaRepository: PrismaRepository;

  async initialize(
    overrideBuilder?: (builder: TestingModuleBuilder) => TestingModuleBuilder,
  ) {
    let moduleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });
    if (overrideBuilder) {
      moduleBuilder = overrideBuilder(moduleBuilder);
    }
    this.moduleFixture = await moduleBuilder.compile();
    this.app = this.moduleFixture.createNestApplication();

    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => new ValidationException(errors),
      }),
    );
    this.app.enableVersioning({
      type: VersioningType.URI,
    });
    this.app.useGlobalPipes(new ValidationPipe());
    const prismaRepository: PrismaRepository = this.app.get(PrismaRepository);
    prismaRepository.enableShutdownHooks(this.app);

    await this.app.init();
    await this.databaseHelper.migrateDatabase();
    this.httpService = this.app.getHttpServer();
    this.address = this.httpService.listen().address();
  }

  async close() {
    await this.app.close();
    await this.databaseHelper.clearDatabase();
  }

  getTestHelperModule<T>(testHelperModule: new (t: TestHelper) => T): T {
    if (!this.testHelperModules[testHelperModule.name]) {
      this.testHelperModules[testHelperModule.name] = new testHelperModule(
        this,
      );
    }
    return this.testHelperModules[testHelperModule.name];
  }

  getService<T>(service: Type<T>): Promise<T> {
    return this.moduleFixture.get(service, { strict: false });
  }

  getNestedValueFromField(field: string, data): any[] {
    if (!data) {
      return [];
    }
    if (Array.isArray(data)) {
      return uniq(
        [].concat(
          ...data.map((datum) => this.getNestedValueFromField(field, datum)),
        ),
      );
    }
    if (isObject(data)) {
      return uniq(
        [].concat(
          ...Object.keys(data).map((attr) => {
            if (attr === field) {
              return [data[attr]];
            } else {
              return this.getNestedValueFromField(field, data[attr]);
            }
          }),
        ),
      );
    }
    return [];
  }

  get(url: string, callback?: request.CallbackHandler) {
    return request(this.httpService).get(url, callback);
  }

  post(url: string, callback?: request.CallbackHandler) {
    return request(this.httpService).post(url, callback);
  }

  put(url: string, callback?: request.CallbackHandler) {
    return request(this.httpService).put(url, callback);
  }

  delete(url: string, callback?: request.CallbackHandler) {
    return request(this.httpService).delete(url, callback);
  }

  checkAndThrowError(res: request.Response) {
    if (res.statusCode >= 400) {
      throw new Error(
        `Request fail ${res.statusCode}: ` + JSON.stringify(res.body),
      );
    }
  }
}
