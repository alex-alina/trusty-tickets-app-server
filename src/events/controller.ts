import { JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser } from 'routing-controllers'
import { SocialEvent, Ticket, MyComment } from './entities';
import User from '../users/entity';


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
    return await SocialEvent.findOne(id, { relations: ["user"] })
  }

  @Get('/events')
  async getAllEvents() {
    return { events: await SocialEvent.find({ relations: ["user"] }) }
  }
  //add patch for event

  @Authorized()
  @Post('/events/:eventId([0-9]+)/tickets')
  @HttpCode(201)
  async createTicket(
    @Body() ticket: Ticket,
    @Param('eventId') eventId: number,
    @CurrentUser() user: User
  ) {
    ticket.user = user
    ticket.socialEventId = eventId
    const  time = new Date()
    ticket.createdAt = time
    return ticket.save()
  }

  @Get('/events/:eventId([0-9]+)/tickets/:ticketId')
  async getTicket(
    @Param('ticketId') id: number
  ) {
    return await Ticket.findOne(id, { relations: ["user", "socialEventId"] })
  }


  @Get('/events/:eventId([0-9]+)/tickets')
  async getAllTickets() {
    return { tickets: await Ticket.find({ relations: ["user", "socialEventId"] }) }
  }

  //add patch for tickets
  @Authorized()
  @Post('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments')
  @HttpCode(201)
  async createComment(
    @Body() comment: MyComment,
    @Param('ticketId') ticketId: number,
    @CurrentUser() user: User
  ) {
    comment.user = user
    comment.ticketId = ticketId
   
    return comment.save()
  }

}

