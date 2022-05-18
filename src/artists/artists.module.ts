import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArtistController } from './controllers/http/artist.controller';
import { ArtistService } from './services/artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [PrismaModule],
})
export class ArtistsModule {}
