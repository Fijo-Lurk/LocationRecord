import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';
import {
  API_PARAM_APP_ID,
  API_PARAM_CUSTOMER_ID,
  API_PARAM_ENVIRONMENT,
  API_RESPONSE_BAD_REQUEST,
  API_RESPONSE_CONFLICT,
  API_RESPONSE_INTERNAL_SERVER_ERROR,
  API_RESPONSE_NOT_FOUND,
} from './swagger-docs';

@Controller('location/v1')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('customer/:customer_id/environment/:environment/app/:app_id')
  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      default: {
        customer_id: 'MyFirstID',
        environment: 'dev',
        app_id: 'com.smithmicro.viewspot',
        studio_url: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_BAD_REQUEST)
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  async create(
    @Param('customer_id') customer_id: string,
    @Param('environment') environment: string,
    @Param('app_id') app_id: string,
    @Body(new ValidationPipe()) createLocationDto: CreateLocationDto,
  ) {
    const createdLocation = this.locationService.create(customer_id, environment, app_id, createLocationDto.studio_url);
    return createdLocation;
  }

  @Get('')
  @ApiResponse({
    status: 200,
    schema: {
      default: [
        {
          customer_id: 'MyFirstID',
          environment: 'dev',
          app_id: 'com.smithmicro.viewspot',
          studio_url: 'https://viewspot-home-MyFirstID.smithmicro.io',
        },
      ],
    },
  })
  async findAll() {
    const locations = await this.locationService.getAll();
    return locations;
  }

  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      default: {
        customer_id: 'MyFirstID',
        environment: 'dev',
        app_id: 'com.smithmicro.viewspot',
        studio_url: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_BAD_REQUEST)
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  @Get('customer/:customer_id/environment/:environment/app/:app_id')
  @ApiResponse({
    status: 200,
    schema: {
      default: [
        {
          customer_id: 'MyFirstID',
          environment: 'dev',
          app_id: 'com.smithmicro.viewspot',
        },
      ],
    },
  })
  async getOne(
    @Param('customer_id') customer_id: string,
    @Param('environment') environment: string,
    @Param('app_id') app_id: string,
  ) {
    const location = await this.locationService.getOne(customer_id, environment, app_id);
    return location;
  }

  @Patch('customer/:customer_id/environment/:environment/app/:app_id')
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 200,
    description: 'Record updated successfully.',
    schema: {
      default: {
        customer_id: 'MyFirstID',
        environment: 'dev',
        app_id: 'com.smithmicro.viewspot',
        studio_url: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_BAD_REQUEST)
  @ApiResponse(API_RESPONSE_NOT_FOUND)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  async update(
    @Param('customer_id') customer_id: string,
    @Param('environment') environment: string,
    @Param('app_id') app_id: string,
    @Body(new ValidationPipe()) updateLocationDto: UpdateLocationDto,
  ) {
    const updatedLocation = await this.locationService.update(customer_id, environment, app_id, updateLocationDto);
    return updatedLocation;
  }

  @Delete('customer/:customer_id/environment/:environment/app/:app_id')
  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 200,
    description: 'Record successfully deleted.',
    schema: {
      default: {
        customer_id: 'MyFirstID',
        environment: 'dev',
        app_id: 'com.smithmicro.viewspot',
        studio_url: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiResponse(API_RESPONSE_NOT_FOUND)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  async remove(
    @Param('customer_id') customer_id: string,
    @Param('environment') environment: string,
    @Param('app_id') app_id: string,
  ) {
    const deletedLocation = await this.locationService.delete(customer_id, environment, app_id);
    return deletedLocation;
  }
}
