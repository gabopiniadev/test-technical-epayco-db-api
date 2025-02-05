import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../../entities/user/user.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>) {}

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
            }

            user.lastConnection = new Date();

            await user.save();

            return user;
        } catch (error) {
            console.error("Error durante la validación del usuario:", error);
            throw error;
        }
    }

}
