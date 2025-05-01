import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  name: string;
}

// export class LoginUserDto {
//     @IsEmail()
//     email: string;
  
//     @IsNotEmpty()
//     password: string;
//   }