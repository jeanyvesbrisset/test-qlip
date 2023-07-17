import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type ShotDetection = { video_key: string; shots: Shot[] };

type Shot = {
  ts_start: number;
  ts_end: number;
  crop: { x: number; y: number; w: number; h: number } | null;
  label: string | null;
};

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  shot_detection: string; // with postgreSQL i would use JSON but here i'm just using sqlite

  get shotDetection(): ShotDetection {
    return JSON.parse(this.shot_detection);
  }
}
