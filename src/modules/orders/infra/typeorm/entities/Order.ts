import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Foreign Key
  customer_id: string;

  // Objeto para a Foreign key (customer_id) - Criado só se voce quiser acessar o Customer deste order.
  // Relações Many to one, precisam de foreign key (ID). OneToMany não precisam.
  // Esses campos não não criados no database, só a FK dele.
  @ManyToOne(() => Customer, {
    eager: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // Esses campos não não criados no database.
  @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {
    cascade: true,
    eager: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
