import {Controller, Post, Body, HttpCode, HttpStatus, Delete, Param, Get, Put} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() userDto: { customerId: string; email: string; password: string }) {
        return this.userService.create(userDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Partial<{ email: string; password: string }>) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
