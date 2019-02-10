import { JsonController, Post, Get, Authorized, HttpCode, Body, CurrentUser, BadRequestError, Params } from 'routing-controllers'
import User from '../users/entity';
import Comment from './entity';
import Ticket from '../tickets/entity';

const getTicket = async (eventId, ticketId) => {
  const ticket = await Ticket.findOne(ticketId, { relations: ["socialEvent"] })
  if(!ticket) throw new BadRequestError(`Ticket does not exist`)
  if(parseInt(eventId)  !==  ticket.socialEvent.id ) throw new BadRequestError('Event or ticket does not exist')
  return ticket
}

@JsonController()
export default class CommentController {

  @Authorized()
  @Post('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments')
  @HttpCode(201)
  async createComment(
    @Body() comment: Comment,
    @Params() params:any,
    @CurrentUser() user: User
  ) {
    const ticket = await getTicket(params.eventId, params.ticketId)
    comment.user = user
    comment.ticket = ticket
    return comment.save()
  }

  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments/:commentId([0-9]+)')
  async getComment(
    @Params() params: any
  ) {
    await getTicket(params.eventId, params.ticketId)
    const comment = await Comment.findOne(params.commentId, { relations: ["ticket"]})
    if(!comment) throw new BadRequestError(`Comment does not exist`)
    if(parseInt(params.ticketId) !==  comment.ticket.id ) throw new BadRequestError('Ticket or comment does not exist')
    return await Comment.findOne(params.commentId, { relations: ["user"] })
  }


  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments')
  async getAllComments(
    @Params() params: any
  ) {
    await getTicket(params.eventId, params.ticketId)
    const comments = await Comment.find({ 
      where: { ticket: { id: params.ticketId } },
      relations: ["ticket"],
    })
    if(!comments) throw new BadRequestError(`No comments found`)
    return { comments: comments.map(
      comment => {
        delete comment.ticket
        return comment
      } 
    )}
  }

  //add patch for comments
}
