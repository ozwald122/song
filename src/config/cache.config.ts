import { CacheModule } from '@nestjs/common';

export const cacheConfig = CacheModule.registerAsync({
  useFactory: () => ({
    isGlobal: true,
    ttl: 3456000, // 40 days
  }),
});
