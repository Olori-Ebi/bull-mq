import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('user-batch-queue')
export class BatchProcessor {
  private readonly logger = new Logger(BatchProcessor.name);

  @Process('process-batch')
  async handleBatch(job: Job) {
    const users = job.data.users;

    this.logger.log(`🚀 Processing batch of ${users.length} users...`);

    for (const user of users) {
      await this.processUser(user);
    }

    this.logger.log(`✅ Finished batch ${job.id}`);
  }

  private async processUser(user: any) {
    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.logger.log(`Processed user: ${user.name}`);
  }
}
