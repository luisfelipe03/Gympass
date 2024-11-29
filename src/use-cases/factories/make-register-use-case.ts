import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../register";

export function makeRegisterUseCase(): RegisterUserUseCase {
    const userRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUserUseCase(userRepository);

    return registerUseCase;
}