import { UserModel } from "../../infrastructure";
import { UserDtoValidator } from "../dtos/user-dto-validator";
import { UserEntity } from "../entities/user.entity";


export class AuthRepository {
    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return await UserModel.findOne({ email });
    }

    async registerUser(userDto: UserDtoValidator): Promise<UserEntity> {
        const newUser = new UserModel(userDto);       
        await newUser.save();

        return new UserEntity(newUser._id.toString(), newUser.name, newUser.email, newUser.password, newUser.roles, newUser.img);
    }
}