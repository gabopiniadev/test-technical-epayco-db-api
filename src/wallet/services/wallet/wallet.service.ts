import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../../entities/wallet/wallet.schema';

@Injectable()
export class WalletService {

    constructor(@InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>) {}

    create(data: { customerId: string; balance: number; currency: string }) {
        const wallet = new this.walletModel(data);
        return wallet.save();
    }

    findAll() {
        return this.walletModel.find();
    }

    findOne(id: string) {
        return this.walletModel.findById(id);
    }

    update(id: string, data: Partial<{ balance: number; currency: string }>) {
        return this.walletModel.findByIdAndUpdate(id, data, { new: true });
    }

    remove(id: string) {
        return this.walletModel.findByIdAndDelete(id);
    }


}
