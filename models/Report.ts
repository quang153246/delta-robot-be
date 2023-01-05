
import mongoose, { Schema, Document, Model} from "mongoose";

interface ReportDoc extends Document {
    nutDetected: number;
    nutPicked: number;
    operator?: string;
    createdAt?:Date;
}

const ReportSchema = new Schema({
    nutDetected: {type: Number},
    nutPicked: {type: Number},
    operator: {type: String},
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

const Report = mongoose.model<ReportDoc>('Report', ReportSchema)

export { Report }