import { Validators } from "../../adapters";
import { CustomError } from "../errors/custom-error";
import { UserDto } from "../interfaces/user.interface";


export class UserDtoValidator {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) { }

  static create(object: UserDto): UserDtoValidator {
    const { name, email, password } = object;

    if (!name) {
      throw CustomError.badRequest("Missing name");
    }
    if (typeof name !== "string") {
      throw CustomError.badRequest("Name must be a string");
    }
    if (!email) {
      throw CustomError.badRequest("Missing email");
    }
    if (!Validators.email.test(email)) {
      throw CustomError.badRequest("Invalid email format");
    }
    if (!password) {
      throw CustomError.badRequest("Missing password");
    }
    if (password.length < 6) {
      throw CustomError.badRequest("Password too short (minimum 6 characters)");
    }

    return new UserDtoValidator(name, email, password);
  }
}
