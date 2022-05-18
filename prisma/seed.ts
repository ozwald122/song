import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import * as _ from 'lodash';
dotenv.config();

const prisma = new PrismaClient();

const main = async () => {
  for (let i = 0; i < 100; i++) {
    await prisma.artist.create({
      data: {
        name: faker.name.findName(),
        description: faker.lorem.paragraph(),
        dayOfBirth: faker.date.past().toISOString(),
        stageName: faker.name.findName(),
      },
    });
  }

  for (let i = 0; i < 500; i++) {
    const artist = await getRandomArtist();
    await prisma.song.create({
      data: {
        name: faker.word.noun(),
        genre: faker.music.genre(),
        releaseDate: faker.date.past().toISOString(),
        artists: {
          connect: artist.map((item) => ({ id: item.id })),
        },
      },
    });
  }
};

const getRandomArtist = async () => {
  const itemCount = await prisma.artist.count();
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - 2);
  const orderBy = _.sample(['id', 'name', 'stageName']);
  const orderDir = _.sample(['asc', 'desc']);
  return prisma.artist.findMany({
    take: 2,
    skip,
    orderBy: { [orderBy]: orderDir },
  });
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
