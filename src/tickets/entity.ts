import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm'
import { MaxLength, IsString,  } from 'class-validator';
import User from '../users/entity'
import SocialEvent from '../events/entity';
import Comment from '../comments/entity';



@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer')
  price: number

  @IsString()
  @MaxLength(50)
  @Column('text')
  description: string

  @Column('text',{ nullable: true })
  picture?: 'string'
  
  @Column('time')
  createdAt: Date

  @ManyToOne(() => User, user => user.tickets)
  user: User

  @ManyToOne(() => SocialEvent, socialEvent => socialEvent.tickets)
  socialEvent: SocialEvent

  @OneToMany(() => Comment, comment => comment.ticket) 
  comments: Comment[]
}