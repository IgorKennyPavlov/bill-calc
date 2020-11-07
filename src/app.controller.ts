import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService, IBill } from './app.service'

@Controller('api/archive')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getAllBills() {
    return await this.appService.getAllBills()
  }

  @Get('last')
  async getLastBill() {
    return await this.appService.getLastBill()
  }

  @Post()
  async addNewBill(@Body() newBill: IBill) {
    return this.appService.addNewBill(newBill)
  }
}
