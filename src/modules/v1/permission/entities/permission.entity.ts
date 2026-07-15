import BaseEntity from '../../../../infrastructure/repositories/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'permissions', schema: 'public' })
export class Permission extends BaseEntity {
  @Column({ unique: true })
  key!: string; // e.g. "user:approve"

  @Column({ type: 'varchar' })
  action!: string; // e.g. "approve"

  @Column({ type: 'varchar' })
  resource!: string; // e.g. "user"

  @Column()
  description!: string;
}
