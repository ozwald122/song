import { BadRequestException, Injectable } from '@nestjs/common';
import { randomPick } from 'src/core/helpers/array.helper';
import { PrismaRepository } from 'src/prisma/prisma.repository';
import { CreateSongDto } from '../controllers/dtos/create-song.dto';
import { UpdateSongDto } from '../controllers/dtos/update-song.dto';

@Injectable()
export class SongService {
  constructor(private prismaRepo: PrismaRepository) {}

  createSong(body: CreateSongDto) {
    return this.prismaRepo.song.create({
      data: {
        ...body,
        artists: {
          connect: body.artists.map((item: number) => ({ id: item })),
        },
      },
    });
  }

  updateSong(id: number, body: UpdateSongDto) {
    const payload: any = { ...body };
    if (body.artists) {
      payload.artists = {
        set: [],
        connect: body.artists.map((item: number) => ({ id: item })),
      };
    }
    return this.prismaRepo.song.update({ where: { id }, data: payload });
  }

  async deleteSong(id: number) {
    await this.prismaRepo.song.delete({ where: { id } });
  }

  async getOneSong(id: number) {
    const song = await this.prismaRepo.song.findFirst({
      where: { id },
      include: { artists: true },
    });
    if (!song) {
      throw new BadRequestException('Song not found!');
    }
    return song;
  }

  async getRandomSong(exclude: number[], limit = 10) {
    const itemCount = await this.prismaRepo.song.count();
    const skip = Math.max(0, Math.floor(Math.random() * itemCount) - limit);
    const orderBy = randomPick(['id', 'name', 'genre', 'releaseDate']);
    const orderDir = randomPick(['asc', 'desc']);
    return this.prismaRepo.song.findMany({
      take: limit,
      skip,
      orderBy: { [orderBy]: orderDir },
      where: { id: { notIn: exclude } },
      include: { artists: true },
    });
  }
}
