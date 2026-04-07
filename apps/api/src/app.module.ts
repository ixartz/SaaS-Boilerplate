import { join, resolve } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatModule } from './chat/chat.module';
import { HealthModule } from './health/health.module';

// Get the root directory by navigating up from the current file
// apps/api/src -> apps/api -> apps -> root
const rootDir = resolve(__dirname, '..', '..', '..');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(rootDir, `.env.${process.env.NODE_ENV || 'development'}.local`),
        join(rootDir, `.env.${process.env.NODE_ENV || 'development'}`),
        join(rootDir, '.env.local'),
        join(rootDir, '.env'),
      ],
    }),
    HealthModule,
    ChatModule,
  ],
})
export class AppModule {}
