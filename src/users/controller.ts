import { JsonController, Post, /*Param, Get,*/ Body, BodyParam, /*Authorized,*/ BadRequestError } from 'routing-controllers'
import User from './entity';


@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() newUserData: User,
    @BodyParam("confirmPassword") password_confirmation: string
  ) {
    const { password, ...rest } = newUserData
    if (password !== password_confirmation) throw new BadRequestError('Passwords do not match')
    const entity = User.create(rest)
    await entity.setPassword(password)

    const user = await entity.save()

    return user
  }

  // @Authorized()
  // @Get('/users/:id([0-9]+)')
  // getUser(
  //   @Param('id') id: number
  // ) {
  //   return User.findOne(id)
  // }

  // @Authorized()
  // @Get('/users')
  // getAllUsers() {
  //   return User.find()
  // }
}
