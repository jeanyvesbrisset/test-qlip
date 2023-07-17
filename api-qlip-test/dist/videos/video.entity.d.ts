type ShotDetection = {
    video_key: string;
    shots: Shot[];
};
type Shot = {
    ts_start: number;
    ts_end: number;
    crop: {
        x: number;
        y: number;
        w: number;
        h: number;
    } | null;
    label: string | null;
};
export declare class Video {
    id: number;
    path: string;
    shot_detection: string;
    get shotDetection(): ShotDetection;
}
export {};
