import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./autheticate";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new AuthenticateUseCase(userRepository);
    }); 

    it("should be able to autheticate ", async () => {
        userRepository.create({
            name: "John Doe",
            email: "john@email.com",
            password_hash: await bcrypt.hash("123456", 6),
        });

        const { user } = await sut.execute({
            email: "john@email.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to autheticate with wrong email", async () => {
        await expect(() =>
            sut.execute({
                email: "john@email.com",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to autheticate with wrong password", async () => {
        userRepository.create({
            name: "John Doe",
            email: "john@email.com",
            password_hash: await bcrypt.hash("123456", 6),
        });

        await expect(() =>
            sut.execute({
                email: "john@email.com",
                password: "1234567",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
