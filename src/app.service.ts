import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Document, Model, Schema } from 'mongoose'

export const ArchivedBillSchema = new Schema({
  timestamp: { type: String, required: true },
  month: { type: String, required: true },
  coldWaterCounter: { type: Number, required: true },
  coldWaterUsed: { type: Number, required: true },
  coldWaterCost: { type: Number, required: true },
  coldWaterTotal: { type: Number, required: true },
  hotWaterCounter: { type: Number, required: true },
  hotWaterUsed: { type: Number, required: true },
  hotWaterCost: { type: Number, required: true },
  hotWaterTotal: { type: Number, required: true },
  waterUtilizationCost: { type: Number, required: true },
  waterUtilizationTotal: { type: Number, required: true },
  electricityCounter: { type: Number, required: true },
  electricityUsed: { type: Number, required: true },
  electricityCost: { type: Number, required: true },
  electricityTotal: { type: Number, required: true },
  total: { type: Number, required: true }
})

export interface IBill extends Document {
  timestamp: string,
  month: string,
  coldWaterCounter: number,
  coldWaterUsed: number,
  coldWaterCost: number,
  coldWaterTotal: number,
  hotWaterCounter: number,
  hotWaterUsed: number,
  hotWaterCost: number,
  hotWaterTotal: number,
  waterUtilizationCost: number,
  waterUtilizationTotal: number,
  electricityCounter: number,
  electricityUsed: number,
  electricityCost: number,
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

  addNewBill(newBill: IBill) {
    try {
      new this._archivedBillModel(newBill).save()
    } catch (err) {
      console.log({ err })
      return { status: 'failure' }
    }
    return { status: 'success' }
  }
}
