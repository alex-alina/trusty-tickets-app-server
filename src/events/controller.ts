import {
  JsonController, Post, Param, Get, Authorized, HttpCode, Body, CurrentUser } from 'routing-controllers'
import { SocialEvent } from './entities';
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
    return socialEvent.save()
  }

  @Get('/events/:id([0-9]+)')
  async getEvent(
    @Param('id') id: number
  ) {
    return await SocialEvent.findOne(id)
  }

  @Get('/events')
  async getAllEvents() {
    return { events: await SocialEvent.find() }
  }
}

//add patch 