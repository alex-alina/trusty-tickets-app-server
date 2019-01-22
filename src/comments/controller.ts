import { JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser, BadRequestError, QueryParams } from 'routing-controllers'
import User from '../users/entity';
import Comment from './entity';
import Ticket from '../tickets/entity';

@JsonController()
export default class CommentController {

  @Authorized()
  @Post('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments')
  @HttpCode(201)
  async createComment(
    @Body() comment: Comment,
    @Param('ticketId') ticketId: number,
    @QueryParams() 
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
    return await Comment.findOne(id, { relations: ["user", "ticket"] })
  }


  @Get('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments')
  async getAllComments() {
    return { comments: await Comment.find({ relations: ["user", "ticket"] }) }
  }

  //add patch for comments
}

