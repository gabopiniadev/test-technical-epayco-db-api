import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
    @Prop({ required: true })
    typeDocument: string;

    @Prop({ required: true, unique: true })
    document: string;

    @Prop({ required: true })
    nameCustomer: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true, unique: true })
    email: string;

    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
