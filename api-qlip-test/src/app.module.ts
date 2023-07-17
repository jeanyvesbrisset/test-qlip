import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database.module';
import { VideoModule } from './videos/video.module';

@Module({
  imports: [DatabaseModule, VideoModule],
  controllers: [AppController],
})
export class AppModule {}
