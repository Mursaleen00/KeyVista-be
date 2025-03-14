import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, JwtService],
})
export class PropertiesModule {}
