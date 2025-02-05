import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Wallet, WalletSchema} from "../../entities/wallet/wallet.schema";
import {WalletController} from "../../controllers/wallet/wallet.controller";
import {WalletService} from "../../services/wallet/wallet.service";
import {CustomerModule} from "../customer/customer.module";
import {UserModule} from "../user/user.module";
import {TransactionModule} from "../transaction/transaction.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Wallet.name, schema: WalletSchema },
        ]),
        forwardRef(() => CustomerModule),
        forwardRef(() => UserModule),
        forwardRef(() => TransactionModule),
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [
        WalletService,
        MongooseModule.forFeature([
            { name: Wallet.name, schema: WalletSchema },
        ]),
    ],
})
export class WalletModule {}
