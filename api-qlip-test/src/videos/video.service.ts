import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import * as ffmpeg from 'fluent-ffmpeg';

const PORTRAIT_WIDTH = 1080;
const PORTRAIT_HEIGHT = 1920;

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async getVideoById(id: number): Promise<Video> {
    const video = await this.videoRepository.findOneBy({ id });
    return video;
  }

  // WIP
  async verticalAutoCrop(id: number): Promise<void> {
    const video = await this.videoRepository.findOneBy({ id });

    const shots = video.shotDetection.shots;
    const complexFilter = [];
    shots.forEach(({ ts_start, ts_end, crop }, index) => {
      const shotId = `shot_${index}`;

      let trimExpression = '';

      if (crop) {
        trimExpression = `[0:v]trim=${ts_start}:${ts_end},crop=${crop.w}:${crop.h}:${crop.x}:${crop.y},setpts=PTS-STARTPTS[${shotId}]`;
      } else {
        trimExpression = `[0:v]trim=${ts_start}:${ts_end},setpts=PTS-STARTPTS[${shotId}]`;
      }

      complexFilter.push(trimExpression);
    });

    const concatFilterExpression =
      complexFilter.join(';') +
      ';' +
      complexFilter.map((_element, index) => `[shot_${index}]`).join('') +
      `concat=n=${complexFilter.length}:v=1:a=0[outv]`;

    console.log(concatFilterExpression);

    const command = ffmpeg();
    command
      .complexFilter(concatFilterExpression, ['outv'])
      .input('./../api-qlip-test/fake-object-storage/video_test_qlip.mp4')
      .output('./../api-qlip-test/fake-object-storage/result.mp4')
      .on('start', () => {
        console.log('start');
      })
      .on('end', () => {
        console.log('DONE');
      })
      .on('progress', (progress) => {
        // console.log(JSON.stringify(progress));
        console.log('Processing: ' + progress.targetSize + ' KB converted');
      })
      .on('error', (err) => {
        console.log(err);
      })
      .run();

    // ffmpeg('./../api-qlip-test/fake-object-storage/video_test_qlip.mp4')
    //   .outputOptions(
    //     '-vf',
    //     `split[original][copy];[copy]scale=-1:ih*(16/9)*(16/9),crop=w=ih*9/16,gblur=sigma=20[blurred];[blurred][original]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2`,
    //   )
    //   .output('./../api-qlip-test/fake-object-storage/result.mp4')
    //   .on('start', () => {
    //     console.log('Conversion complete');
    //   })
    //   .on('progress', (progress) => {
    //     // console.log(JSON.stringify(progress));
    //     console.log('Processing: ' + progress.targetSize + ' KB converted');
    //   })
    //   .on('end', () => {
    //     console.log('Conversion complete');
    //   })
    //   .on('error', (err) => {
    //     console.error('Error:', err.message);
    //   })
    //   .run();
  }
}
