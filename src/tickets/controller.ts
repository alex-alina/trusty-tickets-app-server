import { JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser, BadRequestError, Params } from 'routing-controllers'
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
    const socialEvent = await SocialEvent.findOne(eventId)
    if (!socialEvent) throw new BadRequestError(`Event does not exist`)
    ticket.user = user
    ticket.socialEvent = socialEvent
    const time = new Date()
    ticket.createdAt = time

    return ticket.save()
  }

  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)')
  async getTicket(
    @Params() params: any,
  ) {
    const event = await SocialEvent.findOne(params.eventId)
    if (!event) throw new BadRequestError(`Event does not exist`)

    const ticketRiskData = await Ticket.findOne(params.ticketId, { relations: ["user", "user.tickets", "socialEvent", "socialEvent.tickets","comments"] })
    if (!ticketRiskData) throw new BadRequestError(`Ticket does not exist`)
    if(ticketRiskData.socialEvent.id !== parseInt(params.eventId)) throw new BadRequestError('Ticket does not exist for this event')
    const risk = calculateRisk(ticketRiskData)

    const ticket = await Ticket.findOne(params.ticketId, { relations: ["user", "socialEvent", "comments"] })
    if (!ticket) throw new BadRequestError(`Ticket does not exist`)
    ticket['risk'] = risk

    return ticket
  }


  @Get('/events/:eventId([0-9]+)/tickets')
  async getAllTickets(
    @Param('eventId') eventId: number,
  ) {
    const event = await SocialEvent.findOne(eventId, {  relations: ["tickets"] })
    if (!event) throw new BadRequestError(`Event does not exist`)
    return { tickets: event.tickets }
  }

  //add patch for tickets
}

 // const allTickets = await Ticket.find({ 
    //   relations: ["user", "socialEvent"],
    //   where: { socialEvent: {id: eventId}}
    // })
    // if (!allTickets) throw new BadRequestError(`No tickets found`)

    // return { tickets: allTickets.filter(ticket => ticket.socialEvent.id === eventId) }
