import { Validators } from "../../adapters";
import { UserDto } from "../interfaces/user.interface";


export class UserDtoValidator {
    private constructor(
      public name: string,
      public email: string,
      public password: string,
    ) {}

    static create(object: UserDto): [string?, UserDtoValidator?] {
        const { name, email, password } = object;
    
        if (!name) return ["Missing name"];
        if (typeof name !== "string") return ["Name must be a string"];
        if (!email) return ["Missing email"];
        if (!Validators.email.test(email)) return ["Email is not valid"];
        if (!password) return ["Missing password"];
        if (password.length < 6) return ["Password too short"];
    
        return [undefined, new UserDtoValidator(name, email, password)];
      }
    }
