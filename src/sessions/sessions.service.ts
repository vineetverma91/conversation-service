import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.schema';

@Injectable()
export class SessionsService {

  constructor(
    @InjectModel(Session.name)
    private sessionModel: Model<SessionDocument>
  ) {}

  async createOrGet(data: any) {

    return this.sessionModel.findOneAndUpdate(
      { sessionId: data.sessionId },
      {
        $setOnInsert: {
          ...data,
          startedAt: new Date(),
          status: 'active'
        }
      },
      { upsert: true, new: true }
    );
  }

  async findById(sessionId: string) {

    const session = await this.sessionModel.findOne({ sessionId });

    if (!session) throw new NotFoundException('Session not found');

    return session;
  }

  async complete(sessionId: string) {

    return this.sessionModel.findOneAndUpdate(
      { sessionId },
      {
        status: 'completed',
        endedAt: new Date()
      },
      { new: true }
    );
  }
}