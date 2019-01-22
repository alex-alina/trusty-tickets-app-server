import { JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser, BadRequestError } from 'routing-controllers'
import SocialEvent from '../events/entity';
import User from '../users/entity';
import { calculateRisk } from './logic'
import Ticket from './entity';


@JsonController()
export default class TicketController {

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
    if (!socialEvent) throw new BadRequestError(`Event does not exist`)
    ticket.socialEvent = socialEvent
    const time = new Date()
    ticket.createdAt = time

    return ticket.save()
  }

  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)')
  async getTicket(
    @Param('ticketId') id: number
  ) {
    const ticket = await Ticket.findOne(id, { relations: ["user", "user.id", "socialEvent", "socialEvent.id"] })
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    const risk = calculateRisk(ticket)
    ticket['risk'] = risk
    return ticket
  }


  @Get('/events/:eventId([0-9]+)/tickets')
  async getAllTickets(
    @Param('eventId') eventId: number,
  ) {
    const event = await SocialEvent.findOne(eventId)
    if (!event) throw new BadRequestError(`Event does not exist`)
    return await Ticket.find({ relations: ["user", "socialEvent"] })
  }

  //add patch for tickets
}

