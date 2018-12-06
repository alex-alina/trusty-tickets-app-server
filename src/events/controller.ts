import { JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser, BadRequestError } from 'routing-controllers'
import { SocialEvent, Ticket, MyComment } from './entities';
import User from '../users/entity';
import { calculateRisk } from './logic'


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
    const socialEvent = await SocialEvent.findOne(eventId)
    if(!socialEvent) throw new BadRequestError(`Event does not exist`)
    ticket.socialEvent = socialEvent
    const  time = new Date()
    ticket.createdAt = time
    
    return ticket.save()
  }

  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)')
  async getTicket(
    @Param('ticketId') id: number
  ) {
    const ticket = await Ticket.findOne(id, { relations: ["user", "socialEvent"] })
    if(!ticket) throw new BadRequestError(`Ticket does not exist`)
    const risk = calculateRisk(ticket)
    ticket['risk'] = risk
    return ticket
  }


  @Get('/events/:eventId([0-9]+)/tickets')
  async getAllTickets(
    @Param('eventId') eventId: number,
  ) {
    const event = await SocialEvent.findOne(eventId)
    if(!event) throw new BadRequestError(`Event does not exist`)
    return  await Ticket.find({ relations: ["user", "socialEvent"] })
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
    const ticket = await Ticket.findOne(ticketId)
    if(!ticket) throw new BadRequestError(`Ticket does not exist`)
    comment.ticket = ticket
    return comment.save()
  }

  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments/:commentId([0-9]+)')
  async getComment(
    @Param('commentId') id: number
  ) {
    return await MyComment.findOne(id, { relations: ["user", "ticket"] })
  }


  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments')
  async getAllComments() {
    return { comments: await MyComment.find({ relations: ["user", "ticket"] }) }
  }

  //add patch for comments
}

