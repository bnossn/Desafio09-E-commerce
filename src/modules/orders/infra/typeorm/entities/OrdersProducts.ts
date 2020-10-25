import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Foreign Key
  order_id: string;

  // Objeto para a Foreign key (order_id) - Criado só se voce quiser acessar o Order deste orders_products.
  // Esses campos não não criados no database, só a FK dele.
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column() // Foreign Key
  product_id: string;

  // Objeto para a Foreign key (product_id) - Criado só se voce quiser acessar o Product deste orders_products.
  // Esses campos não não criados no database, só a FK dele.
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('decimal')
  price: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
