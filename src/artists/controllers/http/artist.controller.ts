import { Body, Controller, Post } from '@nestjs/common';
import { ArtistService } from 'src/artists/services/artist.service';
import { CreateArtistDto } from '../dtos/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }
}
