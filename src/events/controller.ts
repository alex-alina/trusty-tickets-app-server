import { JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser } from 'routing-controllers'
import User from '../users/entity';
import SocialEvent from './entity';
// import Ticket from '../tickets/entity'


@JsonController()
export default class SocialEventController {

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() socialEvent: SocialEvent,
    @CurrentUser() user: User
  ) {
    socialEvent.user = user
    return await socialEvent.save()
  }

  @Get('/events/:id([0-9]+)')
  async getEvent(
    @Param('id') id: number
  ) {
    return await SocialEvent.findOne(id, { relations: ["user", "tickets"] })
  }

  @Get('/events')
  async getAllEvents() {
    return { events: await SocialEvent.find({ relations: ["user", "tickets"] }) }
  }

  //add patch for event

}
