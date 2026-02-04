import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true, index: true })
  sessionId: string;

  @Prop()
  type: string;

  @Prop({ type: Object })
  payload: object;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index({ sessionId: 1, eventId: 1 }, { unique: true });