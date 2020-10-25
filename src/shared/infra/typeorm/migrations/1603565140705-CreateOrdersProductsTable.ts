import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersProductsTable1603565140705
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id', // Foreign Key
            type: 'uuid',
          },
          {
            name: 'product_id', // Foreign Key
            type: 'uuid',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'quantity',
            type: 'integer',
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
            name: 'OrdersProducts_Order',
            columnNames: ['order_id'], // Coluna nesta tabela que recebera a foreign key
            referencedTableName: 'orders', // Tabela que fará referencia com este campo
            referencedColumnNames: ['id'], // Coluna na tabela que vai enviar este foreign id
            onDelete: 'SET NULL', // Pode ser RESTRIC, SET NULL, CASCADE
            onUpdate: 'CASCADE', // Qualquer alteração terá que refletir em todo nosso DB
          },
          {
            name: 'OrdersProducts_Product',
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_products');
  }
}
