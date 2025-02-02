import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Transaction, TransactionSchema} from "../../entities/transaction/transaction.schema";
import {TransactionController} from "../../controllers/transaction/transaction.controller";
import {TransactionService} from "../../services/transaction/transaction.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
        ]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
