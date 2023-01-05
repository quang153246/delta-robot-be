
import mongoose, { Schema, Document } from "mongoose";

interface MissionDoc extends Document {
    missionName: string;
    startTime: number;
    stopTime: number;
}

const MissionSchema = new Schema({
    missionName: {type: String, require: true},
    startTime: {type: Number, require: true},
    stopTime: {type: Number, require: true},
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

const Mission = mongoose.model<MissionDoc>('mission', MissionSchema)

export { Mission }