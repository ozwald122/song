import { TestHelper } from 'src/core/test/test.helper';
import { PrismaRepository } from 'src/prisma/prisma.repository';
import * as _ from 'lodash';
import faker from '@faker-js/faker';

export class ArtistTestHelper {
  private prisma: PrismaRepository;
  constructor(private testHelper: TestHelper) {
    this.prisma = this.testHelper.app.get(PrismaRepository);
  }

  async findOne() {
    let result = await this.prisma.artist.findFirst({ skip: _.random(10) });
    if (!result) {
      result = await this.createOne();
    }
    return result;
  }

  async createOne() {
    return this.prisma.artist.create({
      data: this.getBody(),
    });
  }

  getBody() {
    return {
      name: faker.random.alpha(10),
      dayOfBirth: faker.date.past().toISOString(),
      description: faker.lorem.paragraph(),
      stageName: faker.random.alpha(10),
    };
  }
}
