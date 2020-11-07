import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService, ArchivedBillSchema } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bills'),
    MongooseModule.forFeature([{ name: 'ArchivedBill', schema: ArchivedBillSchema }])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
