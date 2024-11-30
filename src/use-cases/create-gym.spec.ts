import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able create a new gym", async () => {
        const { gym } = await sut.execute({
            name: "Academia do Zé",
            description: "Academia do Zé",
            phone: "123456789",
            latitude: -8.8270525,
            longitude: -36.0098326,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
