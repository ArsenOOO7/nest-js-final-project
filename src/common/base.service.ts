import { BaseEntity } from './domain/base.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseService<T extends BaseEntity> {
  protected async createInternal(entity: T): Promise<T> {
    return await this.getRepository().save(entity);
  }

  protected async updateInternal(entity: T): Promise<T> {
    return await this.getRepository().save(entity);
  }

  public async getById(id: string): Promise<T> {
    const entity: T = await this.getRepository().findOneBy( { id } as FindOptionsWhere<T>);
    if (!entity) {
      throw new Error(`Cannot find entity ${this.getEntityName()} by ${id}`);
    }
    return entity;
  }

  public async delete(id: string): Promise<void> {
    await this.getRepository().delete((await this.getById(id)).id);
  }

  protected abstract getRepository(): Repository<T>;

  protected abstract getEntityName(): string;
}
