import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
    customer: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: null })
    lastConnection: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
