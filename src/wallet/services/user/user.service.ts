import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../../entities/user/user.schema';
import { Customer } from '../../entities/customer/customer.schema';
import { Wallet } from '../../entities/wallet/wallet.schema';
import {Model, Types} from "mongoose";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
        @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>
    ) {}

    async create(userDto: { customerId: string; email: string; password: string }) {
        const { customerId, email, password } = userDto;

        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new HttpException('El usuario ya existe.', HttpStatus.CONFLICT);
        }

        const newUser = new this.userModel({
            customer: customerId,
            email,
            password,
        });

        await newUser.save();
        return { message: 'Usuario creado exitosamente.', userId: newUser._id };
    }

    async getProfileInfo(params: {document: string, phone: string }) {

        const customer = await this.customerModel
            .findOne({
                $and: [
                    { document: params.document },
                    { phone: params.phone },
                ],
            })
            .exec();

        console.log('Customer ID:', customer?._id);

        if (!customer) {
            throw new HttpException('Cliente no encontrado.', HttpStatus.NOT_FOUND);
        }
        const user = await this.userModel.findOne({ customer: customer._id.toString() }).exec();

        console.log("Usuario es = " + user);
        const wallet = await this.walletModel.findOne({ customer: customer._id }).exec();

        console.log("Billetera es = " + wallet)

        if (!user) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        return {
            name: customer.nameCustomer,
            phone: customer.phone,
            document: customer.document,
            email: customer.email,
            wallet: wallet?.status,
            last: user.lastConnection,
        };
    }

    findAll() {
        return this.userModel.find().exec();
    }

    findOne(id: string) {
        return this.userModel.findById(id).exec();
    }

    update(id: string, data: Partial<{ email: string; password: string }>) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
