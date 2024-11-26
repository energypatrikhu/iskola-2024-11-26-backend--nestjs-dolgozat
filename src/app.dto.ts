import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateTravelDto {
  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @Length(30)
  description: string;

  @IsString()
  @IsUrl()
  imgUrl: string;

  @IsNumber()
  @IsInt()
  price: number;
}

export class UpdateTravelDto {
  @IsString()
  destination: string;

  @IsString()
  @Length(30)
  description: string;

  @IsString()
  @IsUrl()
  imgUrl: string;

  @IsNumber()
  @IsInt()
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}
