import { CustomError } from "../errors/custom-error";
import { UserDto } from "../interfaces/user.interface";

export class UserEntity {
    constructor(
      public _id: string,
      public name: string,
      public email: string,
      public password: string,
      public roles: string[],
      public img?: string |null,
    ) {}

    static createFromObject(object: UserDto): UserEntity {
        const { _id, name, email, password, roles, img } = object;
    
        if (!_id) throw CustomError.badRequest("Missing id");
        if (!name) throw CustomError.badRequest("Missing name");
        if (!email) throw CustomError.badRequest("Missing email");
        if (!password) throw CustomError.badRequest("Missing password");
        if (!roles) throw CustomError.badRequest("Missing roles");
    
        return new UserEntity(_id, name, email, password, roles, img);
      }
    }

