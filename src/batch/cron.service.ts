import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BatchService } from './batch.service';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    constructor(
        @InjectQueue('user-batch-queue') private readonly batchQueue: Queue,
        private readonly batchService: BatchService
    ) { }

    @Cron('* * * * *') // Runs at 3:00 AM every day
    async handleDailyBatchJob() {
        this.logger.log('Running batch job at 3AM...');
        const users = Array.from({ length: 450 }).map((_, i) => ({
            id: i + 1,
            name: `User${i + 1}`,
        }));

        return this.batchService.enqueueUserBatches(users);
    }
}
