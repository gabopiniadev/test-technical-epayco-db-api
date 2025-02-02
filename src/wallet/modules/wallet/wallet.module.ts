import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Wallet, WalletSchema} from "../../entities/wallet/wallet.schema";
import {WalletController} from "../../controllers/wallet/wallet.controller";
import {WalletService} from "../../services/wallet/wallet.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Wallet.name, schema: WalletSchema },
        ]),
    ],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule {}
