import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { SocialEvent, Ticket, MyComment } from '../events/entities';

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  // Now password property will be excluded only during classToPlain operation.
  //=>this method transforms your class object back to plain javascript object, 
  //that can be JSON.stringify later.
  @IsString()
  @MinLength(4)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  @OneToMany(() => SocialEvent, socialEvent => socialEvent.user, {eager:true}) 
  socialEvents: SocialEvent[]

  @OneToMany(() => Ticket, ticket => ticket.user, {eager:true}) 
  tickets: Ticket[]

  @OneToMany(() => MyComment, myComment => myComment.user, {eager:true}) 
  myComments: MyComment[]
}