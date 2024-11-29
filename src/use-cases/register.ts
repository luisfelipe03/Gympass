import { UsersRepository } from "@/repositories/users-repository";
import bcrypt from "bcrypt";
import { EmailAlreadyExistsError } from "./errors/email-already-exists";
import { User } from "@prisma/client";

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUserUseCaseResponse {
    user: User;
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUserRequest): Promise<RegisterUserUseCaseResponse> {
        const password_hash = await bcrypt.hash(password, 10);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new EmailAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return {
            user,
        };
    }
}
