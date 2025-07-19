import { Controller, Post } from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post('enqueue')
  async enqueue(): Promise<string> {
    const users = Array.from({ length: 450 }).map((_, i) => ({
      id: i + 1,
      name: `User${i + 1}`,
    }));

    return this.batchService.enqueueUserBatches(users);
  }
}
