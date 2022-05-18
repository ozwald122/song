import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of song',
    type: 'string',
    example: 'The greatest song',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Genere of song',
    type: 'string',
    example: 'Pop, Hiphop',
  })
  genre: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Released Date of song',
    type: 'string',
    example: new Date(),
  })
  releaseDate: Date;

  @IsArray()
  @IsInt({ each: true })
  artists: number[];
}
