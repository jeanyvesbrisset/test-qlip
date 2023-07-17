import { Repository } from 'typeorm';
import { Video } from './video.entity';
export declare class VideoService {
    private videoRepository;
    constructor(videoRepository: Repository<Video>);
    getVideoById(id: number): Promise<Video>;
    verticalAutoCrop(id: number): Promise<void>;
}
