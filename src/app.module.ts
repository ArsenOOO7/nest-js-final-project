import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './db/database.module';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    SubjectModule,
    UserModule,
    GroupModule,
  ],
})
export class AppModule {}
