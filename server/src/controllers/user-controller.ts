// src/controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/user-service';

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const token = await UserService.login(req.body);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

export default UserController;
