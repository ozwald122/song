import { Injectable } from '@nestjs/common';
import { PrismaRepository } from 'src/prisma/prisma.repository';
import { CreateArtistDto } from '../controllers/dtos/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prismaRepo: PrismaRepository) {}

  createArtist(body: CreateArtistDto) {
    return this.prismaRepo.artist.create({ data: body });
  }
}
