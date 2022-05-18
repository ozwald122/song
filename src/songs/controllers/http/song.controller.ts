import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Id } from 'src/core/decorators/id.decorator';
import { SongService } from 'src/songs/services/song.service';
import { CreateSongDto } from '../dtos/create-song.dto';
import { UpdateSongDto } from '../dtos/update-song.dto';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get(':id/specific')
  @ApiOperation({
    description: 'Update song by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of song',
  })
  getOneSong(@Id() id: number) {
    return this.songService.getOneSong(id);
  }

  @Get('/random')
  @ApiQuery({
    name: 'exclude',
    required: false,
  })
  getRandomSong(@Query('exclude') exclude: string) {
    return this.songService.getRandomSong(
      exclude?.split(',').map((item) => +item),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createSong(@Body() body: CreateSongDto) {
    return this.songService.createSong(body);
  }

  @Put(':id/update')
  @ApiOperation({
    description: 'Update song by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of song',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  updateSong(@Id() id: number, @Body() body: UpdateSongDto) {
    return this.songService.updateSong(id, body);
  }

  @Delete(':id/delete')
  @ApiOperation({
    description: 'Update song by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of song',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSong(@Id() id: number) {
    return this.songService.deleteSong(id);
  }
}
