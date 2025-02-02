import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {

    @Prop({required: true})
    typeDocument: string;

    @Prop({ required: true, unique: true })
    document: string;

    @Prop({ required: true })
    nameCustomer: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true, unique: true })
    email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
