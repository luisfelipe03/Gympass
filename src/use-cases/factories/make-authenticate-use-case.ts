import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../autheticate";

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUsersRepository();
    const useCase = new AuthenticateUseCase(userRepository);
    
    return useCase;
}