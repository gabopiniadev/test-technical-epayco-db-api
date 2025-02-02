import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from "../../entities/user/user.schema";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    create(data: { customerId: string; email: string; password: string }) {
        const user = new this.userModel(data);
        return user.save();
    }

    findAll() {
        return this.userModel.find();
    }

    findOne(id: string) {
        return this.userModel.findById(id);
    }

    update(id: string, data: Partial<{ email: string; password: string }>) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true });
    }

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

}
