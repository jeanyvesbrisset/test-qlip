"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("./video.entity");
const ffmpeg = require("fluent-ffmpeg");
const PORTRAIT_WIDTH = 1080;
const PORTRAIT_HEIGHT = 1920;
let VideoService = exports.VideoService = class VideoService {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async getVideoById(id) {
        const video = await this.videoRepository.findOneBy({ id });
        return video;
    }
    async verticalAutoCrop(id) {
        const video = await this.videoRepository.findOneBy({ id });
        const shots = video.shotDetection.shots;
        const complexFilter = [];
        shots.forEach(({ ts_start, ts_end, crop }, index) => {
            const shotId = `shot_${index}`;
            let trimExpression = '';
            if (crop) {
                trimExpression = `[0:v]trim=${ts_start}:${ts_end},crop=${crop.w}:${crop.h}:${crop.x}:${crop.y},setpts=PTS-STARTPTS[${shotId}]`;
            }
            else {
                trimExpression = `[0:v]trim=${ts_start}:${ts_end},setpts=PTS-STARTPTS[${shotId}]`;
            }
            complexFilter.push(trimExpression);
        });
        const concatFilterExpression = complexFilter.join(';') +
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
            console.log('Processing: ' + progress.targetSize + ' KB converted');
        })
            .on('error', (err) => {
            console.log(err);
        })
            .run();
    }
};
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideoService);
//# sourceMappingURL=video.service.js.map