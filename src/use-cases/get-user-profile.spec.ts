import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcrypt from "bcrypt";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Register Use Case", () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new GetUserProfileUseCase(userRepository);
    }); 

    it("should be able to get user profile", async () => {
        const createdUser = await userRepository.create({
            name: "John Doe",
            email: "john@email.com",
            password_hash: await bcrypt.hash("123456", 6),
        });

        const {user} = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.id).toEqual(createdUser.id);
    });

    it("should not be able to get user profile with wrong id", async () => {
        await expect(() =>
            sut.execute({
                userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
