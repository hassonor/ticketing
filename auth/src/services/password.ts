import bcrypt from 'bcrypt';

export class Password {
    static async toHash(password: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const match = await bcrypt.compare(suppliedPassword, storedPassword);
        return match;
    }
}
