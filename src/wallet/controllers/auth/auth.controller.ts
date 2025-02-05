import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "../../services/auth/auth.service";
import {CustomerService} from "../../services/customer/customer.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly customerService: CustomerService
    ) {}

    @Post('login')
    async login(@Body() loginData: { email: string; password: string }) {
        const { email, password } = loginData;

        if (!email || !password) {
            throw new HttpException(
                'Email y contraseña son obligatorios',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const user = await this.authService.validateUser(email, password);
            const customer = await this.customerService.findOne(user.customer.toString());

            return {
                status: 'success',
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user._id,
                    email: user.email,
                    customer: user.customer,
                },
                customer: {
                    id: customer?._id,
                    document: customer?.document,
                    name: customer?.nameCustomer,
                    email: customer?.email,
                    phone: customer?.phone,
                }
            };

        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
        }
    }

}
