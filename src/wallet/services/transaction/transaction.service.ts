import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../../entities/transaction/transaction.schema';
import { Model, Types } from 'mongoose';
import { Wallet } from '../../entities/wallet/wallet.schema';
import { Customer } from '../../entities/customer/customer.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  create(data: {
    customerId: string;
    walletId: string;
    type: string;
    amount: number;
  }) {
    const transaction = new this.transactionModel(data);
    return transaction.save();
  }

  findAll() {
    return this.transactionModel.find();
  }

  async findPaymentsByWallet(walletId: string): Promise<any> {
    const objectId = new Types.ObjectId(walletId);

    const transactions = await this.transactionModel
      .find({ fromWallet: objectId })
      .exec();

    if (transactions.length === 0) {
      return [];
    }

    return await Promise.all(
      transactions.map(async (transaction) => {
        const wallet = await this.walletModel
          .findById(transaction.toWallet)
          .exec();

        if (!wallet) {
          throw new Error(
            `Wallet no encontrado para la transacción: ${transaction._id}`,
          );
        }

        const customer = await this.customerModel
          .findById(wallet.customer)
          .exec();

        if (!customer) {
          throw new Error(
            `Customer no encontrado para el wallet: ${wallet._id}`,
          );
        }

        return {
          email: customer.email,
          type: transaction.type,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          description: transaction.description || null,
          transactionReference: transaction.transactionReference,
          createdAt: transaction.createdAt,
        };
      }),
    );
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
