import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PayementDto } from './payement_dto';
import { Payment } from './payment.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('pay')
  create(@Body() body: PayementDto): Promise<Payment> {
    // 66000000
    return this.appService.pay(body);
  }

  @Get('verify/:id')
  verify(@Param('id') id: string) {
    return this.appService.verify(id);
  }

  @Get('all')
  findAll(): Promise<Payment[]> {
    return this.appService.getAll();
  }
}
