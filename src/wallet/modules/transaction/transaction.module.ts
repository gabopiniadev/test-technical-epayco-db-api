import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../../entities/transaction/transaction.schema';
import { TransactionController } from '../../controllers/transaction/transaction.controller';
import { TransactionService } from '../../services/transaction/transaction.service';
import { WalletModule } from '../wallet/wallet.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
    imports: [
        forwardRef(() => WalletModule),
        forwardRef(() => CustomerModule),
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
        ]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [
        TransactionService,
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
        ]),
    ],
})
export class TransactionModule {}
