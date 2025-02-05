import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Wallet} from '../../entities/wallet/wallet.schema';
import {Customer} from "../../entities/customer/customer.schema";
import {Transaction, TransactionStatus, TransactionType} from "../../entities/transaction/transaction.schema";

@Injectable()
export class WalletService {

    constructor(
        @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
        @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>
    ) {}

    async rechargeWallet(document: string, phone: string, amount: number) {
        const customer = await this.customerModel.findOne({ document, phone }).exec();

        if (!customer) {
            throw new HttpException('Cliente no encontrado.', HttpStatus.NOT_FOUND);
        }

        const wallet = await this.walletModel.findOne({ customer: customer._id }).exec();

        if (!wallet) {
            throw new HttpException('Billetera no encontrada.', HttpStatus.NOT_FOUND);
        }

        wallet.balance += amount;
        await wallet.save();

        return {
            status: 'success',
            message: 'Recarga realizada con éxito.',
            balance: wallet.balance,
        };
    }

    async create(data: { customerId: string; balance: number; currency: string }) {
        console.log(data)

        const customer = await this.customerModel.findById(data.customerId);


        if (!customer) {
            throw new HttpException('Cliente no encontrado.', HttpStatus.NOT_FOUND);
        }

        const model = {
            customer: customer._id,
            balance: data.balance,
            currency: data.currency,
        };

        const wallet = new this.walletModel(model);
        return wallet.save();

    }

    async initiatePayment(document: string, phone: string, amount: number, customerId: string): Promise<any> {
        const customer = await this.customerModel.findOne({ document });
        console.log("Mi Customer" + customer);

        const toWallet = await this.walletModel.findOne({ customer: customer?._id });

        const objectId = new Types.ObjectId(customerId);
        const fromWallet = await this.walletModel.findOne({ customer: objectId });

        if (!toWallet) {
            throw new HttpException('Billetera no encontrada.', HttpStatus.NOT_FOUND);
        }

        if (fromWallet != null && fromWallet.balance < amount) {
            throw new HttpException('Saldo insuficiente para realizar el pago.', HttpStatus.BAD_REQUEST);
        }

        const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const sessionId = new Types.ObjectId().toHexString();

        const transaction = new this.transactionModel({
            toWallet: toWallet._id,
            fromWallet: fromWallet?._id,
            type: TransactionType.PAYMENT,
            amount,
            currency: toWallet.currency,
            confirmationCode,
            sessionId,
            status: TransactionStatus.PENDING,
            description: `Pago iniciado por ${document}`,
        });

        await transaction.save();

        return {
            sessionId,
            confirmationCode,
            email: customer?.email || null,
            message: 'Pago registrado correctamente.',
        };
    }

    async confirmPayment(sessionId: string, confirmationCode: string): Promise<any> {
        const transaction = await this.transactionModel.findOne({ sessionId });

        if (!transaction) {
            throw new HttpException('Transacción no encontrada.', HttpStatus.NOT_FOUND);
        }

        if (transaction.status !== TransactionStatus.PENDING) {
            throw new HttpException(
                'La transacción no está en estado pendiente.',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (transaction.confirmationCode !== confirmationCode) {
            throw new HttpException('El código de confirmación es incorrecto.', HttpStatus.UNAUTHORIZED);
        }

        transaction.status = TransactionStatus.SUCCESS;
        await transaction.save();

        const addwallet = await this.walletModel.findOne(transaction?.toWallet);
        const subtractWallet = await this.walletModel.findOne(transaction?.fromWallet);

        if (!addwallet) {
            throw new HttpException('Billetera no encontrada.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!subtractWallet) {
            throw new HttpException('Billetera no encontrada.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        addwallet.balance += transaction.amount;
        subtractWallet.balance -= transaction.amount;

        await addwallet.save();
        await subtractWallet.save();

        return {
            sessionId: transaction.sessionId,
            status: transaction.status,
            message: 'Pago confirmado correctamente.',
        };
    }

    async getBalanceByDocumentAndPhone(
        document: string,
        phone: string,
    ): Promise<{ balance: number; currency: string; status: string, customerName: string, document: string }> {

        const customerEntity = await this.customerModel.findOne({ document, phone }).exec();

        if (!customerEntity) {
            throw new Error('El cliente no existe con el documento y teléfono proporcionados');
        }

        const wallet = await this.walletModel.findOne({ customer: customerEntity._id }).exec();

        if (!wallet) {
            throw new HttpException(
                'Billetera no encontrada.',
                HttpStatus.NOT_FOUND,
            );
        }

        return {
            balance: wallet.balance,
            currency: wallet.currency,
            status: wallet.status,
            customerName: customerEntity.nameCustomer,
            document: customerEntity.document,
        };
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
