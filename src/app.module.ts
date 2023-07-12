import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';

@Module({
  imports: [FcmModule],
})
export class AppModule {}
