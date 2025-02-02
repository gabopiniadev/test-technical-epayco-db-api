import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true, unique: true })
    customer: Types.ObjectId;

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({ required: true })
    currency: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
