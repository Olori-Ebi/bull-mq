import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { BatchProcessor } from './batch.processor';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  BullModule.registerQueue(
    {
      name: 'user-batch-queue',
    },
    {
      name: 'notification_queue'
    }
  ),
  ScheduleModule.forRoot(),
  ],
  controllers: [BatchController],
  providers: [BatchService, BatchProcessor, CronService],
})
export class BatchModule { }