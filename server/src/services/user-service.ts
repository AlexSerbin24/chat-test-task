import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterUser, LoginUser } from '../types/user-types';


class UserService {

  static async register(userData: RegisterUser) {
    const { name, surname, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, surname, email, hashPassword: hashedPassword });
    return await user.save();
  }


  static async login(userData: LoginUser) {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email');
    }


    const isPasswordValid = await bcrypt.compare(password, user.hashPassword)

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

}

export default UserService;
