import {
  IsString,
  IsNotEmpty,
  Min,
  IsEmail,
  IsStrongPassword,
  IsJWT,
} from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword({ minLength: 8 })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthinDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class GoogleAuthDTO{
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  token: string
}