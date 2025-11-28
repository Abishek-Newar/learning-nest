import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){ };
    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id: number){
        return{
            id 
        }
    }

    @Post()
    create(@Body() user: {}){
        return user 
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body() user:{}){
        return user 
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return {
            id
        }
    }
}
