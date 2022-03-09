import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*   @ApiTags('user')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post('create')
  async createUser(): Promise<User> {
    console.log('user created');
    return this.appService.createUser('Random Test name');
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiTags('user')
  @Get(':id')
  async updateUser(): Promise<User> {
    const user = await this.appService.getOneById(1);

    return this.appService.updateUser(user.id, 'NEWNAME');
  }

  @ApiTags('user')
  @ApiResponse({
    status: 202,
    description: 'The record has been successfully deleted.',
  })
  @Delete('delete')
  async deleteUser(): Promise<User> {
    const user = await this.appService.getOneById(2);
    return this.appService.deleteUser(user.id);
  }

  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'The records is found.',
  })
  @Get('get')
  async getOneById(): Promise<User[]> {
    console.log('users found');
    return this.appService.getAll();
  } */
}
