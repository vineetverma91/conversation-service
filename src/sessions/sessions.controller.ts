import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { EventsService } from '../events/events.service';

@Controller('sessions')
export class SessionsController {

  constructor(
    private sessionsService: SessionsService,
    private eventsService: EventsService
  ) {}

  // Create / Upsert
  @Post()
  create(@Body() body: any) {

    return this.sessionsService.createOrGet(body);
  }

  // Add Event
  @Post(':id/events')
  async addEvent(
    @Param('id') id: string,
    @Body() body: any
  ) {

    await this.sessionsService.findById(id);

    return this.eventsService.addEvent({
      ...body,
      sessionId: id
    });
  }

  // Get Session
  @Get(':id')
  async getSession(
    @Param('id') id: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0
  ) {

    const session = await this.sessionsService.findById(id);

    const events = await this.eventsService.getEvents(
      id,
      Number(limit),
      Number(offset)
    );

    return { session, events };
  }

  // Complete Session
  @Post(':id/complete')
  complete(@Param('id') id: string) {

    return this.sessionsService.complete(id);
  }
}