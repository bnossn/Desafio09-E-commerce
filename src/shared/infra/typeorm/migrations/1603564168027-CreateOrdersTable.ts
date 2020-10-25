import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersTable1603564168027
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'OrderCustomer',
            columnNames: ['customer_id'], // Coluna nesta tabela que recebera a foreign key
            referencedTableName: 'customers', // Tabela que fará referencia com este campo
            referencedColumnNames: ['id'], // Coluna na tabela que vai enviar este foreign id
            onDelete: 'SET NULL', // Pode ser RESTRIC, SET NULL, CASCADE
            onUpdate: 'CASCADE', // Qualquer alteração terá que refletir em todo nosso DB
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
