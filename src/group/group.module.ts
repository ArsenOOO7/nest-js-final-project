import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './domain/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupMapper } from './mapper/group.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService, GroupMapper],
  exports: [GroupService, GroupMapper],
})
export class GroupModule {}
