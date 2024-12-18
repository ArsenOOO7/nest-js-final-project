import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './domain/lesson.entity';
import { LessonMapper } from './mapper/lesson.mapper';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    UserModule,
    SubjectModule,
    GroupModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonMapper],
})
export class LessonModule {}
