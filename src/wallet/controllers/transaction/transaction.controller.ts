import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TransactionService} from "../../services/transaction/transaction.service";

@Controller('transaction')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    create(@Body() transactionDto: { customerId: string; walletId: string; type: string; amount: number }) {
        return this.transactionService.create(transactionDto);
    }

    @Get('wallet/:walletId/payments')
    findPaymentsByWallet(@Param('walletId') walletId: string) {
        return this.transactionService.findPaymentsByWallet(walletId);
    }

    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTransactionDto: Partial<{ type: string; amount: number }>) {
        return this.transactionService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionService.remove(id);
    }

}
