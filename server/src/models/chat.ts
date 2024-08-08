import mongoose from 'mongoose';
import Message from './message';

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  lastReadTimestamps: { type: Map, of: Date, default: () => new Map() }, // For handling notifications
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
