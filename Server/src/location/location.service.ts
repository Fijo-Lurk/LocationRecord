import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { MyLogger } from '../../config/logger';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}
  private readonly logger = new MyLogger(LocationService.name);

  async create(
    customerId: string,
    environment: string,
    appId: string,
    studioUrl: string,
  ): Promise<Location> {
    const location = await this.locationsRepository.findOne({
      customerId,
      environment,
      appId,
    });
    if (location) {
      throw new ConflictException(
        `Location already exist. appId:  ${appId}, environment: ${environment}, customerId: ${customerId}`,
      );
    }

    const newLocation = this.locationsRepository.create({
      customerId,
      environment,
      appId,
      studioUrl,
    });
    return this.locationsRepository.save(newLocation);
  }

  async getAll(): Promise<Location[]> {
    return await this.locationsRepository.find();
  }

  async getOne(
    customerId: string,
    environment: string,
    appId: string,
  ): Promise<Location> {
    try {
      const location = await this.locationsRepository.findOneOrFail({
        where: { customerId, environment, appId },
      });
      return location;
    } catch (error) {
      throw new ConflictException(
        this.logger.error('No location found', error),
        `appId: ${appId}, environment: ${environment}, customerId: ${customerId} can't be found`,
      );
    }
  }
  async update(
    customerId: string,
    environment: string,
    appId: string,
    item: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.getOne(customerId, environment, appId);
    const updatedEntity = await this.locationsRepository.save({
      ...location,
      ...item,
    });
    return updatedEntity;
  }

  async delete(
    customerId: string,
    environment: string,
    appId: string,
  ): Promise<Location> {
    const location = await this.getOne(customerId, environment, appId);
    return this.locationsRepository.remove(location);
  }
}
