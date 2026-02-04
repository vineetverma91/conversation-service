import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.schema';

@Injectable()
export class EventsService {

  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>
  ) {}

  async addEvent(data: any) {

    try {
      return await this.eventModel.create(data);
    } catch (err) {

      if (err.code === 11000) {
        return this.eventModel.findOne({
          sessionId: data.sessionId,
          eventId: data.eventId
        });
      }

      throw err;
    }
  }

  async getEvents(
    sessionId: string,
    limit: number,
    offset: number
  ) {

    return this.eventModel.find({ sessionId })
      .sort({ timestamp: 1 })
      .skip(offset)
      .limit(limit);
  }
}