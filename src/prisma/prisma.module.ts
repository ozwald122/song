import { Module } from '@nestjs/common';
import { PrismaRepository } from './prisma.repository';

@Module({
  imports: [],
  providers: [PrismaRepository],
  exports: [PrismaRepository],
})
export class PrismaModule {}
