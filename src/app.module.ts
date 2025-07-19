import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [BatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
