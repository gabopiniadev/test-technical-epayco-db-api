import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer, CustomerSchema } from '../../entities/customer/customer.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
        ]),
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
