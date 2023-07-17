import { VideoService } from './video.service';
import { Video } from './video.entity';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getVideo(videoId: number): Promise<Video>;
    verticalAutoCrop(videoId: number): Promise<void>;
}
