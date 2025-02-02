import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Transaction} from "../../entities/transaction/transaction.schema";
import {Model} from "mongoose";

@Injectable()
export class TransactionService {

    constructor(@InjectModel(Transaction.name)
                private readonly transactionModel: Model<Transaction>
    ) {}

    create(data: { customerId: string; walletId: string; type: string; amount: number }) {
        const transaction = new this.transactionModel(data);
        return transaction.save();
    }

    findAll() {
        return this.transactionModel.find();
    }

    findOne(id: string) {
        return this.transactionModel.findById(id);
    }

    update(id: string, data: Partial<{ type: string; amount: number }>) {
        return this.transactionModel.findByIdAndUpdate(id, data, { new: true });
    }

    remove(id: string) {
        return this.transactionModel.findByIdAndDelete(id);
    }

}
