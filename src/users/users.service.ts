import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user-dto.js';
import { SocketService } from '../socket-service.js';

@Injectable()
export class UsersService  {
    constructor(
        private readonly databaseService:DatabaseService,
        private readonly socketService:SocketService,
    ) { }
    
    async findAll(role? : 'INTERN'| 'ENGINEER' | 'ADMIN'){
        if(role){
            const roleBaseUser = await this.databaseService.user.findMany({
                where:{
                    role: role
                }
            })

            if(roleBaseUser.length === 0){
                throw new NotFoundException;
            }
            return roleBaseUser
        }

        const users = this.databaseService.user.findMany({})

        return users
    }


    async findOne(id:number){
        const user = await this.databaseService.user.findFirst({
            where:{
                id: id
            }
        })

        if(!user){
            throw new NotFoundException
        }

        return user 
    }

    async create(CreateUserDto:CreateUserDto){
        const user = await this.databaseService.user.create({
            data:{
                ...CreateUserDto
            }
        })
        this.socketService.notifyUser('a user is created');

        return user;
    }

    async update(id:number,UpdateUserDto: UpdateUserDto){
        const updatedUser  = await this.databaseService.user.update({
            where:{
                id: id 
            },
            data:{
                ...UpdateUserDto 
            }
        })

        return updatedUser
    }


    async delete(id:number){
        const deletedUser = await this.databaseService.user.delete({
            where:{
                id:id 
            }
        })
        this.socketService.notifyUser('a user is deleted');

        return deletedUser
    }

    
}
