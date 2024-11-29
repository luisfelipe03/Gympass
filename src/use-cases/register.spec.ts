import { describe } from "node:test";
import { expect, it } from "vitest";
import { RegisterUserUseCase } from "./register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists";

describe("Register Use Case", () => {

    it("should be able to register a new user", async () => {
        const registerUser = new RegisterUserUseCase(
            new InMemoryUserRepository()
        );

        const { user } = await registerUser.execute({
            name: "John Doe",
            email: "john@email.com",
            password: "password",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should hash user password upon registration", async () => {
        const registerUser = new RegisterUserUseCase(
            new InMemoryUserRepository()
        );

        const { user } = await registerUser.execute({
            name: "John Doe",
            email: "john@email.com",
            password: "password",
        });

        const isPasswordCorrectlyHashed = await compare("password", user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);

    });

    it("should not be able to register with same email twice", async () => {
        const registerUser = new RegisterUserUseCase(
            new InMemoryUserRepository()
        );

        const email = "john@email.com";

        registerUser.execute({
            name: "John Doe",
            email,
            password: "password",
        });            
        
        await expect(() => 
            registerUser.execute({
                name: "John Doe",
                email,
                password: "password",
            }) 
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
    });
});
