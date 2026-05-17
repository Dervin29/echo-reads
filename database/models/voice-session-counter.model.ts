import { model, Schema, models } from "mongoose";

const VoiceSessionCounterSchema = new Schema({
    clerkId: { type: String, required: true },
    billingPeriodStart: { type: Date, required: true },
    count: { type: Number, default: 0 },
}, { timestamps: true });

VoiceSessionCounterSchema.index({ clerkId: 1, billingPeriodStart: 1 }, { unique: true });

const VoiceSessionCounter = models.VoiceSessionCounter || model('VoiceSessionCounter', VoiceSessionCounterSchema);

export default VoiceSessionCounter;
