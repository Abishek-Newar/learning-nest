import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService:DatabaseService) { }
    
    async findAll(role? : 'INTERN'| 'ENGINEER' | 'ADMIN'){
        if(role){
            const roleBaseUser = this.databaseService.user.findMany({
                where:{
                    role: role
                }
            })

            if(!roleBaseUser){
                throw new NotFoundException;
            }
            return roleBaseUser
        }

        const users = this.databaseService.user.findMany({})

        return users
    }
}
