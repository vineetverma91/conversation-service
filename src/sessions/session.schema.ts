import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {

  @Prop({ unique: true, required: true })
  sessionId: string;

  @Prop({ default: 'initiated' })
  status: string;

  @Prop()
  language: string;

  @Prop({ default: Date.now })
  startedAt: Date;

  @Prop({ default: null })
  endedAt: Date;

  @Prop({ type: Object })
  metadata: object;
}

export const SessionSchema = SchemaFactory.createForClass(Session);