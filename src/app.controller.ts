import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService, IArchiveEntry } from './app.service'

@Controller('api/archive')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getEntries() {
    return await this.appService.getEntries()
  }

  @Get('last')
  async getLastEntry() {
    return await this.appService.getLastEntry()
  }

  @Post()
  async addEntry(@Body() newEntry: IArchiveEntry) {
    return this.appService.addEntry(newEntry)
  }
}
