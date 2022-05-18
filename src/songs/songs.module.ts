import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SongController } from './controllers/http/song.controller';
import { SongService } from './services/song.service';

@Module({
  controllers: [SongController],
  providers: [SongService],
  imports: [PrismaModule],
})
export class SongsModule {}
