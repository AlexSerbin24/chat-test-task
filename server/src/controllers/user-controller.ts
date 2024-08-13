import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user-service';

class UserController {
  static async register(req: Request, res: Response, next:NextFunction) {
    try {
      const result = await UserService.register(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next:NextFunction) {
    try {
      const result = await UserService.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req: Request, res: Response, next:NextFunction) {
    const { token } = req.body;
    try {
      const result = await UserService.google(token);
      res.json(result);
    } catch (error) {
      next(error)
    }
  }


}

export default UserController;
