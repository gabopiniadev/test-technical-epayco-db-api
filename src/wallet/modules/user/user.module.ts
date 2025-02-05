import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../../entities/user/user.schema";
import {UserController} from "../../controllers/user/user.controller";
import {UserService} from "../../services/user/user.service";
import {CustomerModule} from "../customer/customer.module";
import {WalletModule} from "../wallet/wallet.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        forwardRef(() => CustomerModule),
        forwardRef(() => WalletModule),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
