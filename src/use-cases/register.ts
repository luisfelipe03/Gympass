import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUserRequest) {
        const password_hash = await hash(password, 10);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error("Email already in use");
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        });
    }
}