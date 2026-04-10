import { Module } from '@nestjs/common';

import { ChatModule } from './chat/chat.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    HealthModule,
    ChatModule,
  ],
})
export class AppModule {}
