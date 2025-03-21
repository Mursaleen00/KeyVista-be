import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ example: '1asd12312sad123', name: 'participantId' })
  @IsString()
  participantId: string;
}
