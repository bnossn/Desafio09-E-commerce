import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';
import productsRouter from '../../http/routes/products.routes';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    return this.ormRepository.findByIds(products);
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsList = await this.ormRepository.findByIds(products);

    // console.log(productsList);

    const updatedProductsList = productsList.map(productFromList => {
      const productToSubtract = products.find(
        product => product.id === productFromList.id,
      );

      if (!productToSubtract) {
        throw new AppError(
          `Error when updating product, Possibly product ID not found`,
        );
      }

      Object.assign(productFromList, {
        quantity: productFromList.quantity - productToSubtract.quantity,
      });

      return productFromList;
    });

    await this.ormRepository.save(updatedProductsList);

    return updatedProductsList;
  }
}

export default ProductsRepository;
