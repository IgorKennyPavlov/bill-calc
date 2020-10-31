import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService, ArchiveEntrySchema } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bills'),
    MongooseModule.forFeature([{ name: 'ArchiveEntry', schema: ArchiveEntrySchema }])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
