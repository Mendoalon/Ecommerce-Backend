import { BcryptAdapter } from "../../../adapters";
import { AuthRepository, CustomError, UserDtoValidator } from "../../../domain";

export class AuthService {
    constructor(private readonly authRepository: AuthRepository) { }


    // Validación de la existencia del correo electrónico
  public async isEmailAvailable(email: string): Promise<boolean> {
    const existingUser = await this.authRepository.findUserByEmail(email);
    return !existingUser; 
  }

    public async registerUser(userDto: UserDtoValidator): Promise<void> {
        const existingUser = await this.authRepository.findUserByEmail(userDto.email);
        if (existingUser) throw CustomError.badRequest("User already registered");

        try {
            const hashedPassword = BcryptAdapter.hash(userDto.password);
            userDto.password = hashedPassword;
            await this.authRepository.registerUser(userDto);

        } catch (error) {
            throw CustomError.internalServer("Failed to register user");
        }
    }
    
}


