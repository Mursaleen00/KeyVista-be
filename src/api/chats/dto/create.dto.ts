import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    name: 'participantId',
    example: '64f0e45b020947222840998a',
  })
  @IsNotEmpty()
  @IsString()
  participantId: string;
}
