import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'location' })
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
