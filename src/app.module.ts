import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './envSchema';
import { PrismaModule } from './prisma/prisma.module';
import { cacheConfig } from './config/cache.config';
import { S3Module } from './s3/s3.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      validationSchema: envSchema,
      envFilePath: '.env',
      load: [
        () => {
          const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } =
            process.env;
          process.env.DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public&connect_timeout=300`;
          return process.env;
        },
      ],
    }),
    cacheConfig,

    PrismaModule,
    S3Module,
    ArtistsModule,
    SongsModule,
  ],
  providers: [],
})
export class AppModule {}
