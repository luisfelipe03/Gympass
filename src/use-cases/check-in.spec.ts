import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("CheckIn Use Case", () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository);
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
            gymId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});