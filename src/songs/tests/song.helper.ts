import faker from '@faker-js/faker';
import * as _ from 'lodash';
import { ArtistTestHelper } from 'src/artists/tests/artist.helper';
import { TestHelper } from 'src/core/test/test.helper';
import { PrismaRepository } from 'src/prisma/prisma.repository';

export class SongTestHelper {
  private prisma: PrismaRepository;
  private artistTestHelper: ArtistTestHelper;
  constructor(private testHelper: TestHelper) {
    this.prisma = this.testHelper.app.get(PrismaRepository);
    this.artistTestHelper =
      this.testHelper.getTestHelperModule(ArtistTestHelper);
  }

  async findOne() {
    let result = await this.prisma.song.findFirst({ skip: _.random(10) });
    if (!result) {
      result = await this.createOne();
    }
    return result;
  }

  async findById(id: number) {
    return this.prisma.song.findFirst({ where: { id } });
  }

  async createOne() {
    const body = await this.getBody();
    return this.prisma.song.create({
      data: {
        ...body,
        artists: {
          connect: body.artists.map((item: number) => ({ id: item })),
        },
      },
    });
  }

  async getBody() {
    const artist = await this.artistTestHelper.findOne();
    return {
      name: faker.random.alpha(10),
      genre: faker.music.genre(),
      releaseDate: faker.date.past().toISOString(),
      artists: [artist.id],
    };
  }
}
