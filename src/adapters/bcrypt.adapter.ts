import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

export class BcryptAdapter {

    static hash(password: string): string {
        try {
            const salt = genSaltSync();
            return hashSync(password, salt);
        } catch (error) {
            throw new Error("Failed to hash password");
        }
    }

    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}