import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  firstName: string
  @IsNotEmpty()
  lastName: string
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}

export class DeleteUserDto {
  @IsUUID()
  id: string
}

export class UpdateEmailDto {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  @IsEmail()
  email: string
}

export class UpdatePasswordDto {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  oldPassword: string
  @IsNotEmpty()
  password: string
}