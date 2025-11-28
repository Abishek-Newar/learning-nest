import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';
import { SocketService } from './socket-service.js';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,
      limit:3
    },{
      name: 'long',
      ttl: 60000,
      limit:100
    }]),
  ],
  controllers: [AppController],
  providers: [AppService,SocketService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
