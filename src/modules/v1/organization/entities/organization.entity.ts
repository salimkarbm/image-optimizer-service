import { Entity, Column, BeforeInsert } from 'typeorm';
import BaseEntity from '../../../../infrastructure/repositories/base.entity';
import slugify from 'slugify';

@Entity({ name: 'organizations', schema: 'public' })
export class Organization extends BaseEntity {
  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @BeforeInsert()
  generateSlug() {
    if (!this.slug && this.name) {
      this.slug = slugify(this.name, {
        lower: true,
        strict: true,
      });
    }
  }
}
