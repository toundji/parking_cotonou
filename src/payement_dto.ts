/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class PayementDto {
  @ApiProperty({ required: true })
  @IsInt()
  @Min(5)
  montant: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ required: true })
  @IsDate()
  date_debut: Date;

  @ApiProperty({ required: true })
  @IsDate()
  date_fin: Date;

//   @ApiProperty({ required: false })
//   @IsString()
//   @IsOptional()
//   transation_id: string;
// 
//   @ApiProperty({ required: false })
//   @IsString()
//   @IsOptional()
//   transaction_url: string;
}
