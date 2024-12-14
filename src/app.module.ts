import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './db/database.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    SubjectModule,
  ],
})
export class AppModule {}
