import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateAccountDto {
  @IsNotEmpty()
  name: string;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  name: string;
  memo: string;
}

export class TransferTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  transferToId: string;
  @IsNotEmpty()
  memo: string;
  amount: number;
}
