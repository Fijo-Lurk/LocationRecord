import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryColumn()
  customer_id: string;

  @PrimaryColumn()
  environment: string;

  @PrimaryColumn()
  app_id: string;

  @Column()
  studio_url: string;
}
