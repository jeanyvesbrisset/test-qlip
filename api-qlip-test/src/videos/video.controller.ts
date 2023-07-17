import { Controller, Get, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.entity';

@Controller('/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/:videoId')
  async getVideo(@Param('videoId') videoId: number): Promise<Video> {
    return await this.videoService.getVideoById(videoId);
  }

  @Get('/vertical-auto-crop/:videoId')
  async verticalAutoCrop(@Param('videoId') videoId: number): Promise<void> {
    return await this.videoService.verticalAutoCrop(videoId);
  }
}
