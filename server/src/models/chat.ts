import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: {type:String, required:true},
  lastName: {type:String},
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  lastRead:  { type: Date, default: Date.now }, 
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
