import { Request, Response } from "express";

import { AuthService } from "../../services/auth/auth.service";
import { CustomError, UserDtoValidator } from "../../../domain";


export class AuthController {

  //DI
  constructor(private readonly authService: AuthService) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  registerUser = async (req: Request<UserDtoValidator>, res: Response) => {
    const [error, userDto] = UserDtoValidator.create(req.body);
    if (error) return res.status(500).json({ error: "Internal server error" });

    if(!userDto) return res.status(400).json({ error: "Bad request" });
    
    try {
      await this.authService.registerUser(userDto);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      this.handleError(error, res);
    }
  };

}