import { Router } from "express";
import { AuthService } from "../services/auth/auth.service";
import { AuthController } from "../controllers/auth/auth.controller";
import { AuthRepository } from "../../domain";

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        //Instacia repositorios, servicios y controladores
        const authRepository = new AuthRepository();
        const authService = new AuthService(authRepository);
        const authController = new AuthController(authService);

        // Rutas de autenticación
        router.post('/register', authController.registerUser);

        return router;
    }

}