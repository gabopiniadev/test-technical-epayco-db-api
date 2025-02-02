import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../../entities/customer/customer.schema';

@Injectable()
export class CustomerService {

    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<Customer>
    ) {}

    create(data: { document: string; name: string; email: string; phone: string }) {
        const customer = new this.customerModel(data);
        return customer.save();
    }

    findAll() {
        return this.customerModel.find();
    }

    findOne(id: string) {
        return this.customerModel.findById(id);
    }

    update(id: string, data: Partial<{ document: string; name: string; email: string; phone: string }>) {
        return this.customerModel.findByIdAndUpdate(id, data, { new: true });
    }

    remove(id: string) {
        return this.customerModel.findByIdAndDelete(id);
    }

}
