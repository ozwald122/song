import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

/**
 * Extension of the PrismaClient for use with NestJs.
 */
@Injectable()
export class PrismaRepository
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
  constructor(configService: ConfigService) {
    /**
     * Get the database url from environmental variables and pass it in.
     */
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.$use(async (params, next) => {
      if (params.action.includes('find') || params.action === 'updateMany') {
        params.args['where'] = { deletedAt: null, ...params.args['where'] };
      }
      if (params.action == 'delete') {
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }
      if (params.action == 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }
      return next(params);
    });
  }

  /**
   * Disconnect from the database when the application is shutting down.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /**
   * A utility function used to clear all database rows for testing.
   */
  clearDatabase() {
    const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);
    return Promise.all(
      modelNames.map((modelName) =>
        this[modelName[0].toLowerCase() + modelName.slice(1)].deleteMany(),
      ),
    );
  }
}
