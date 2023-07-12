import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';

@Module({
  providers: [FcmService],
  controllers: [FcmController]
})
export class FcmModule {}
