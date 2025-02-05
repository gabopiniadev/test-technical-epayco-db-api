import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TransactionType {
    RECHARGE = 'recharge',
    PAYMENT = 'payment',
    REFUND = 'refund',
}

export enum TransactionStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Transaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
    toWallet: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
    fromWallet: Types.ObjectId;

    @Prop({ type: String, enum: TransactionType, required: true })
    type: TransactionType;

    @Prop({ required: true, min: 0 })
    amount: number;

    @Prop({ required: true })
    currency: string;

    @Prop({ default: null })
    confirmationCode?: string;

    @Prop({ default: null })
    sessionId?: string;

    @Prop({ type: String, enum: TransactionStatus, default: TransactionStatus.PENDING })
    status: TransactionStatus;

    @Prop({ default: null })
    description?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
