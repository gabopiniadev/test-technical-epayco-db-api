import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true, unique: true })
    customer: Types.ObjectId

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({ required: true })
    currency: string;

    @Prop({ default: null })
    balanceLimit?: number;

    @Prop({ default: null })
    lastRecharge?: Date;

    @Prop({ default: 'active' })
    status: 'active' | 'inactive' | 'blocked';

    @Prop({ type: [Types.ObjectId], ref: 'Transaction', default: [] })
    transactions: Types.ObjectId[];

    @Prop({ default: null })
    lastActivityDate?: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
