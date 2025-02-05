import {forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer, CustomerSchema } from '../../entities/customer/customer.schema';
import {WalletModule} from "../wallet/wallet.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
        ]),
        forwardRef(() => WalletModule),
        forwardRef(() => UserModule),
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [
        CustomerService,
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
        ]),
    ],
})
export class CustomerModule {}
