import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer/customer.schema';
import { Wallet, WalletSchema } from './entities/wallet/wallet.schema';
import { Transaction, TransactionSchema } from './entities/transaction/transaction.schema';
import { User, UserSchema } from './entities/user/user.schema';
import { WalletService } from './services/wallet/wallet.service';
import { WalletController } from './controllers/wallet/wallet.controller';
import { CustomerService } from './services/customer/customer.service';
import { UserService } from './services/user/user.service';
import { TransactionService } from './services/transaction/transaction.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { UserController } from './controllers/user/user.controller';
import { CustomerModule } from './modules/customer/customer.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
            { name: Wallet.name, schema: WalletSchema },
            { name: Transaction.name, schema: TransactionSchema },
            { name: User.name, schema: UserSchema },
        ]),
        CustomerModule,
        WalletModule,
        TransactionModule,
        UserModule,
    ],
    controllers: [WalletController, CustomerController, TransactionController, UserController],
    providers: [WalletService, CustomerService, UserService, TransactionService],
    exports: [MongooseModule],
})
export class WalletModule {}
