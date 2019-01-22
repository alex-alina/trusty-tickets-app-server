import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import { MaxLength, IsString,  } from 'class-validator';
import User from '../users/entity'
import Ticket from '../tickets/entity';


@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MaxLength(180)
  @Column('text')
  text: string

  @ManyToOne(() => User, user => user.comments)
  user: User

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  ticket: Ticket

}