import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class LocationBaseline1628514283054 implements MigrationInterface {
  name = 'LocationBaseline1628514283054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'location',
        columns: [
          {
            name: 'customerId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'environment',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'appId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'studioUrl',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('location');
  }
}
