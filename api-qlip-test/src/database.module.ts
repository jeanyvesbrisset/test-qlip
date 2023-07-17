import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './videos/video.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './qlip-database.sqlite',
      entities: [Video],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
