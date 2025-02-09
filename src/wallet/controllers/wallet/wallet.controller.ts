import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put, Query
} from '@nestjs/common';
import {WalletService} from "../../services/wallet/wallet.service";

@Controller('wallet')
export class WalletController {

    constructor(
        private readonly walletService: WalletService) {}

    @Post('payment')
    async initiatePayment(
        @Body() paymentData: { document: string; phone: string; amount: number, customerId: string },
    ) {
        const { document, phone, amount , customerId } = paymentData;

        if (!document || !phone || !amount || amount <= 0) {
            throw new HttpException(
                'Todos los campos son obligatorios y el monto debe ser mayor a 0.',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            return await this.walletService.initiatePayment(document, phone, amount, customerId);
        } catch (error) {
            console.error('Error al iniciar el pago:', error.message);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('payment/confirm')
    async confirmPayment(
        @Body() confirmationData: { sessionId: string; confirmationCode: string },
    ) {
        const { sessionId, confirmationCode } = confirmationData;

        if (!sessionId || !confirmationCode) {
            throw new HttpException(
                'Todos los campos son obligatorios (sessionId, confirmationCode).',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            return await this.walletService.confirmPayment(sessionId, confirmationCode);
        } catch (error) {
            console.error('Error al confirmar el pago:', error.message);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('recharge')
    async rechargeWallet(
        @Body() rechargeData: { document: string; phone: string; amount: number },
    ) {
        const { document, phone, amount } = rechargeData;

        if (!document || !phone || !amount || amount <= 0) {
            throw new HttpException(
                'Todos los campos son obligatorios y el monto debe ser mayor a 0.',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            return await this.walletService.rechargeWallet(document, phone, amount);
        } catch (error) {
            console.log(error.message)
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('balance')
    async getBalance(
        @Query('document') document: string,
        @Query('phone') phone: string,
    ) {
        if (!document || !phone) {
            throw new BadRequestException(
                'Documento y número de celular son obligatorios.',
            );
        }

        try {
            const result = await this.walletService.getBalanceByDocumentAndPhone(
               document,
                phone,
            );
            return {
                success: true,
                message: 'Saldo consultado exitosamente.',
                data: result,
            };
        } catch (error) {
            throw new HttpException(
                { success: false, message: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('info')
    async getWalletByCustomer(@Query('customerId') customerId: string) {
        try {
            const result = await this.walletService.getWalletByCustomer(customerId);
            return {
                success: true,
                message: 'Billetera consultada exitosamente.',
                data: result,
            };
        } catch (error) {
            throw new HttpException(
                { success: false, message: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post()
    async create(@Body() walletDto: { customerId: string; balance: number; currency: string }) {
        const { customerId, balance, currency } = walletDto;

        if (!customerId || balance === undefined || !currency) {
            throw new HttpException(
                'Todos los campos son obligatorios (customerId, balance y currency).',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            return this.walletService.create(walletDto);
        } catch (error) {
            console.error('Error al crear la billetera:', error.message);
            throw new HttpException(
                'Error al registrar la billetera.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
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
