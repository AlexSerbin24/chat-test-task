// src/models/Message.ts
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    isUserMessage: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
