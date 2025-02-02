import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TransactionType {
    RECARGA = 'RECARGA',
    PAGO = 'PAGO',
}

@Schema({ timestamps: true })
export class Transaction extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
    customer: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
    wallet: Types.ObjectId;

    @Prop({ required: true, enum: Object.values(TransactionType) })
    type: TransactionType;

    @Prop({ required: true })
    mount: number;

    @Prop({ required: true })
    sessionId: string;

    @Prop({ required: false })
    token: string;

    @Prop({ required: false })
    confirmation: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
