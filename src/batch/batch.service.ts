import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class BatchService {
  constructor(@InjectQueue('user-batch-queue') private queue: Queue) {}

  async enqueueUserBatches(users: any[], batchSize = 100) {
    const totalBatches = Math.ceil(users.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const batch = users.slice(i * batchSize, (i + 1) * batchSize);

      await this.queue.add('process-batch', { users: batch });
    }

    return `Queued ${totalBatches} user batches.`;
  }
}
