import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    name: {type:String, required:true},
    surname: {type:String, required:true},
    email: { type: String, unique: true, required:true },
    hashPassword: {type:String},
});

const User = mongoose.model('User', userSchema);
export default User;
