import { Entity, Column } from 'typeorm';
import User from '../../users/entities/user.entity';
import BaseEntity from '../../../../infrastructure/repositories/base.entity';

@Entity({ name: 'organizations', schema: 'public' })
export class Organization extends BaseEntity {
  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;
}
