import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsModule } from './sessions/sessions.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/conversation'),
    SessionsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
