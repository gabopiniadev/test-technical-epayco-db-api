import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";
import {ConfigModule} from "@nestjs/config";
import {CustomerModule} from "./wallet/modules/customer/customer.module";
import {TransactionModule} from "./wallet/modules/transaction/transaction.module";
import {UserModule} from "./wallet/modules/user/user.module";

@Module({
  imports: [
      WalletModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => {
        const mongoUri = 'mongodb://localhost:27017/epayco';
        console.log('MongoDB URI manual:', mongoUri);
        return { uri: mongoUri };
      },
    }),
    CustomerModule,
    WalletModule,
    TransactionModule,
    UserModule
  ]
})
export class AppModule {}
