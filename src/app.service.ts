import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Document, Model, Schema } from 'mongoose'

export const ArchivedBillSchema = new Schema({
  timestamp: { type: String, required: true },
  monthYear: { type: String, required: true },
  coldWaterCounter: { type: Number, required: true },
  coldWaterUsed: { type: Number, required: true },
  coldWaterPrice: { type: Number, required: true },
  coldWaterTotal: { type: Number, required: true },
  hotWaterCounter: { type: Number, required: true },
  hotWaterUsed: { type: Number, required: true },
  hotWaterPrice: { type: Number, required: true },
  hotWaterTotal: { type: Number, required: true },
  waterUtilizationPrice: { type: Number, required: true },
  waterUtilizationTotal: { type: Number, required: true },
  electricityCounter: { type: Number, required: true },
  electricityUsed: { type: Number, required: true },
  electricityPrice: { type: Number, required: true },
  electricityTotal: { type: Number, required: true },
  total: { type: Number, required: true }
})

export interface IBill extends Document {
  timestamp: string,
  monthYear: string,
  coldWaterCounter: number,
  coldWaterUsed: number,
  coldWaterPrice: number,
  coldWaterTotal: number,
  hotWaterCounter: number,
  hotWaterUsed: number,
  hotWaterPrice: number,
  hotWaterTotal: number,
  waterUtilizationPrice: number,
  waterUtilizationTotal: number,
  electricityCounter: number,
  electricityUsed: number,
  electricityPrice: number,
  electricityTotal: number,
  total: number
}

@Injectable()
export class AppService {
  constructor(
    @InjectModel('ArchivedBill') private _archivedBillModel: Model<IBill>
  ) {
  }

  async getAllBills() {
    return await this._archivedBillModel.find().exec()
  }

  async getLastBill() {
    return (await this._archivedBillModel.find().sort({ _id: -1 }).limit(1).exec())[0]
  }

  async addNewBill(newBill: IBill) {
    return await new this._archivedBillModel(newBill).save()
  }
}
