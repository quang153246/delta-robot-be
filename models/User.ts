
import mongoose, { Schema, Document, Model} from "mongoose";

interface UserDoc extends Document {
    username: string;
    password: string;
    description: string;
    phone: string;
    role: string;
}

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    description: {type: String},
    phone: {type: String},
   
},{
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v,
            delete ret.createAt,
            delete ret.updateAt

        }
    }
});

const User = mongoose.model<UserDoc>('user', UserSchema)

export { User }