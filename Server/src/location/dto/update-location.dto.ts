import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsUrl({ require_protocol: true, require_valid_protocol: true })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Base URL for a ViewSpot Studio deployment.',
    example: 'https://viewspot-home-MyFirstID.smithmicro.io',
    minimum: 1,
  })
  studioUrl: string;
}
