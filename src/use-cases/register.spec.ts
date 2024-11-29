import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUserUseCase } from "./register";
import bcrypt from "bcrypt";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists";

let userRepository: InMemoryUserRepository;
let sut: RegisterUserUseCase;

describe("Register Use Case", () => {

    beforeEach(()=> {
        userRepository = new InMemoryUserRepository();
        sut = new RegisterUserUseCase(userRepository);
    })

    it("should be able to register a new user", async () => {

        const { user } = await sut.execute({
            name: "John Doe",
            email: "john@email.com",
            password: "password",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should hash user password upon registration", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "john@email.com",
            password: "password",
        });

        const isPasswordCorrectlyHashed = await bcrypt.compare("password", user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);

    });

    it("should not be able to register with same email twice", async () => {
        const email = "john@email.com";

        sut.execute({
            name: "John Doe",
            email,
            password: "password",
        });            
        
        await expect(() => 
            sut.execute({
                name: "John Doe",
                email,
                password: "password",
            }) 
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
    });
});
