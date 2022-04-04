import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryColumn()
  customerId: string;

  @PrimaryColumn()
  environment: string;

  @PrimaryColumn()
  appId: string;

  @Column()
  studioUrl: string;
}
