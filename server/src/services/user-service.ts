import User from '../models/user';
import Chat from '../models/chat';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterUser, LoginUser } from '../types/user-types';
import ChatService from './chat-service';
import { OAuth2Client } from 'google-auth-library';
import ApiError from '../types/error-types';


class UserService {

  private static async createPreDefinedChats(userId){
    const chatsFirstNames = ["ChatFirstName1", "ChatFirstName2", "ChatFirstName3"];
    const chatLastNames = ["ChatLastName1", "ChatLastName2", "ChatLastName3"]
    for (let i = 0; i < 3; i++) {
      await ChatService.createChat({ firstName: chatsFirstNames[i], lastName: chatLastNames[i], userId });

    }
  }

  static async register(userData: RegisterUser) {
    const { name, surname, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw ApiError.BadRequest('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, surname, email, hashPassword: hashedPassword });
    await user.save();

    await UserService.createPreDefinedChats(user._id.toString());
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, id: user._id.toString() };
  }


  static async login(userData: LoginUser) {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Invalid email');
    }


    const isPasswordValid = await bcrypt.compare(password, user.hashPassword)

    if (!isPasswordValid) {
      throw ApiError.BadRequest('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, id: user._id.toString() };
  }


  static async google(tokenId: string) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, given_name: name = "Unknown", family_name: surname = "Unknown", email } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        name,
        surname,
        email,
      });
      await user.save();

      UserService.createPreDefinedChats(user._id.toString());
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, id: user._id.toString() };

  }
}
export default UserService;
