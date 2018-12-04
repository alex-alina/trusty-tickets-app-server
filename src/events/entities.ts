import { BaseEntity, PrimaryGeneratedColumn, Column, Entity,/* OneToMany,*/ ManyToOne } from 'typeorm'
import { Length, MaxLength, IsString } from 'class-validator';
import User from '../users/entity'

@Entity()
export class SocialEvent extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 50)
  @Column('text')
  name: string

  @IsString()
  @MaxLength(300)
  @Column('text')
  description: string

  //picture
  @Column('text')
  picture: string

  //start date
  @Column('date')
  startDate: Date

  //end date
  @Column('date')
  endDate: Date



  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @ManyToOne(() => User, user => user.socialEvents)
  user: User

  // @OneToMany(() => Ticket, ticket => ticket.socialEvent) 
  // tickets: Ticket[]
}
