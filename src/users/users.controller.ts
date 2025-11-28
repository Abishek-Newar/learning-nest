import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){ };
    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id: number){
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) user:CreateUserDto){
        return this.userService.create(user)
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) user:CreateUserDto){
        return this.userService.update(id,user)
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id)
    }
}
