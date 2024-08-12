import { Request, Response } from 'express';
import UserService from '../services/user-service';

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const result = await UserService.register(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await UserService.login(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async googleLogin(req: Request, res: Response) {
    const { token } = req.body;
    try {
      const result = await UserService.google(token);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


}

export default UserController;
