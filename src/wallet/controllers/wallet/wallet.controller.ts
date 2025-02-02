import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {WalletService} from "../../services/wallet/wallet.service";

@Controller('wallet')
export class WalletController {

    constructor(private readonly walletService: WalletService) {}

    @Post()
    create(@Body() walletDto: { customerId: string; balance: number; currency: string }) {
        return this.walletService.create(walletDto);
    }

    @Get()
    findAll() {
        return this.walletService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.walletService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateWalletDto: Partial<{ balance: number; currency: string }>) {
        return this.walletService.update(id, updateWalletDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.walletService.remove(id);
    }

}
