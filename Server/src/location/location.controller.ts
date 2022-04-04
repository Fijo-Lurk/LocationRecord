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

  @Post('customer/:customerId/environment/:environment/app/:appId')
  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      default: {
        customerId: 'MyFirstID',
        environment: 'dev',
        appId: 'com.smithmicro.viewspot',
        studioUrl: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_BAD_REQUEST)
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  async create(
    @Param('customerId') customerId: string,
    @Param('environment') environment: string,
    @Param('appId') appId: string,
    @Body(new ValidationPipe()) createLocationDto: CreateLocationDto,
  ) {
    const createdLocation = this.locationService.create(customerId, environment, appId, createLocationDto.studioUrl);
    return createdLocation;
  }

  @Get('')
  @ApiResponse({
    status: 200,
    schema: {
      default: [
        {
          customerId: 'MyFirstID',
          environment: 'dev',
          appId: 'com.smithmicro.viewspot',
          studioUrl: 'https://viewspot-home-MyFirstID.smithmicro.io',
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
        customerId: 'MyFirstID',
        environment: 'dev',
        appId: 'com.smithmicro.viewspot',
        studioUrl: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_BAD_REQUEST)
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  @Get('customer/:customerId/environment/:environment/app/:appId')
  @ApiResponse({
    status: 200,
    schema: {
      default: [
        {
          customerId: 'MyFirstID',
          environment: 'dev',
          appId: 'com.smithmicro.viewspot',
        },
      ],
    },
  })
  async getOne(
    @Param('customerId') customerId: string,
    @Param('environment') environment: string,
    @Param('appId') appId: string,
  ) {
    const location = await this.locationService.getOne(customerId, environment, appId);
    return location;
  }

  @Patch('customer/:customerId/environment/:environment/app/:appId')
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 200,
    description: 'Record updated successfully.',
    schema: {
      default: {
        customerId: 'MyFirstID',
        environment: 'dev',
        appId: 'com.smithmicro.viewspot',
        studioUrl: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_BAD_REQUEST)
  @ApiResponse(API_RESPONSE_NOT_FOUND)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  async update(
    @Param('customerId') customerId: string,
    @Param('environment') environment: string,
    @Param('appId') appId: string,
    @Body(new ValidationPipe()) updateLocationDto: UpdateLocationDto,
  ) {
    const updatedLocation = await this.locationService.update(customerId, environment, appId, updateLocationDto);
    return updatedLocation;
  }

  @Delete('customer/:customerId/environment/:environment/app/:appId')
  @ApiParam(API_PARAM_CUSTOMER_ID)
  @ApiParam(API_PARAM_ENVIRONMENT)
  @ApiParam(API_PARAM_APP_ID)
  @ApiResponse({
    status: 200,
    description: 'Record successfully deleted.',
    schema: {
      default: {
        customerId: 'MyFirstID',
        environment: 'dev',
        appId: 'com.smithmicro.viewspot',
        studioUrl: 'https://viewspot-home-MyFirstID.smithmicro.io',
      },
    },
  })
  @ApiResponse(API_RESPONSE_CONFLICT)
  @ApiResponse(API_RESPONSE_NOT_FOUND)
  @ApiResponse(API_RESPONSE_INTERNAL_SERVER_ERROR)
  async remove(
    @Param('customerId') customerId: string,
    @Param('environment') environment: string,
    @Param('appId') appId: string,
  ) {
    const deletedLocation = await this.locationService.delete(customerId, environment, appId);
    return deletedLocation;
  }
}
