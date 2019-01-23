import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm'
import { Length, MaxLength, IsString,  } from 'class-validator';
import User from '../users/entity'
import Ticket from '../tickets/entity';

@Entity()
export default class SocialEvent extends BaseEntity {

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

  @Column('text')
  picture: string

  @Column('date')
  startDate: Date

  @Column('date')
  endDate: Date
 
  @ManyToOne(() => User, user => user.socialEvents)
  user: User

  @OneToMany(() => Ticket, ticket => ticket.socialEvent) 
  tickets: Ticket[]
}





