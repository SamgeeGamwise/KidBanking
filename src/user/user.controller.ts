import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { DeleteUserDto, LoginUserDto, RegisterUserDto, UpdateEmailDto, UpdatePasswordDto } from './user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':id')
    async getUser(@Param('id') userId: string) {
        return await this.userService.getUser(userId);
    }

    @Post()
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        return await this.userService.login(email, password);
    }

    @Post()
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        const { firstName, lastName, email, password } = registerUserDto;
        return await this.userService.createUser(firstName, lastName, email, password);
    }

    @Delete()
    async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
        const { id } = deleteUserDto;
        return await this.userService.deleteUser(id);
    }

    @Patch("/email") 
    async updateEmail(@Body() updateEmailDto: UpdateEmailDto) {
        const { id, email } = updateEmailDto;
        return await this.userService.updateUserEmail(id, email);
    }

    @Patch("/password") 
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        const { id, oldPassword, password } = updatePasswordDto;
        return await this.userService.updateUserPassword(id, oldPassword, password);
    }
}
