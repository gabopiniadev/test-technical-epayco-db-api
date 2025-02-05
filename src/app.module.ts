import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";
import {ConfigModule} from "@nestjs/config";


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
  ]

})
export class AppModule {}
