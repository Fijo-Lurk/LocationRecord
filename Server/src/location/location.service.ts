import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MyLogger } from 'config/logger';
import { Repository } from 'typeorm';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private locationsRepository: Repository<Location>) {}
  private readonly logger = new MyLogger(LocationService.name);

  async create(customer_id: string, environment: string, app_id: string, studio_url: string): Promise<Location> {
    const location = await this.locationsRepository.findOne({
      customer_id,
      environment,
      app_id,
    });
    if (location) {
      throw new ConflictException(
        `Location already exist. app_id:  ${app_id}, environment: ${environment}, customer_id: ${customer_id}`,
      );
    }

    const newLocation = this.locationsRepository.create({ customer_id, environment, app_id, studio_url });
    return this.locationsRepository.save(newLocation);
  }

  async getAll(): Promise<Location[]> {
    return await this.locationsRepository.find();
  }

  async getOne(customer_id: string, environment: string, app_id: string): Promise<Location> {
    try {
      const location = await this.locationsRepository.findOneOrFail({ where: { customer_id, environment, app_id } });
      return location;
    } catch (error) {
      throw new ConflictException(
        this.logger.error('No location found', error),
        `app_id: ${app_id}, environment: ${environment}, customer_id: ${customer_id} can't be found`,
      );
    }
  }
  async update(customer_id: string, environment: string, app_id: string, item: UpdateLocationDto): Promise<Location> {
    const location = await this.getOne(customer_id, environment, app_id);
    const updatedEntity = await this.locationsRepository.save({ ...location, ...item });
    return updatedEntity;
  }

  async delete(customer_id: string, environment: string, app_id: string): Promise<Location> {
    const location = await this.getOne(customer_id, environment, app_id);
    return this.locationsRepository.remove(location);
  }
}
