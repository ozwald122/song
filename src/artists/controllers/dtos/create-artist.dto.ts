import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of artist',
    type: 'string',
    example: 'DN',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Day of birth',
    type: 'string',
    example: '22/05/2018',
  })
  dayOfBirth: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Stage Name of artist',
    type: 'string',
    example: 'Haha',
  })
  stageName: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Description about artist',
    type: 'string',
    example: 'Haha',
  })
  description: string;
}
