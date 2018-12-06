import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm'
import { Length, MaxLength, IsString,  } from 'class-validator';
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

  @Column('text')
  picture: string

  @Column('date')
  startDate: Date

  @Column('date')
  endDate: Date
 
  @ManyToOne(() => User, user => user.socialEvents)
  user: User

  @OneToMany(() => Ticket, ticket => ticket.socialEvent, {eager:true}) 
  tickets: Ticket[]

}


@Entity()
export class Ticket extends BaseEntity {

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

  @OneToMany(() => MyComment, myComment => myComment.ticket, {eager:true}) 
  myComments: MyComment[]
}

@Entity()
export class MyComment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MaxLength(180)
  @Column('text')
  text: string

  @ManyToOne(() => User, user => user.myComments)
  user: User

  @ManyToOne(() => Ticket, ticket => ticket.myComments)
  ticket: Ticket

}
