import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { SocketService } from '../socket-service.js';
@Module({
  controllers: [UsersController],
  providers: [UsersService, SocketService]
})
export class UsersModule { }
