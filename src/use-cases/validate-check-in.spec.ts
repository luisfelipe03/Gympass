import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidateError } from "./errors/late-check-in-validate";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate CheckIn Use Case", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to validate check in", async () => {
        const checkIn = await checkInsRepository.create({
            user_id: "user-01",
            gym_id: "gym-01",
        });

        await sut.execute({
            checkInId: checkIn.id,
        });

        expect(checkIn.validated_at).toBeDefined();
    });

    it("should not be able to validate a check in that does not exist", async () => {
        await expect(
            async () =>
                await sut.execute({
                    checkInId: "invalid-id",
                })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it("should not be able to validate a check in after 20 minutes of its creation", async () => {
        vi.setSystemTime(new Date(2024, 0, 1, 12, 0, 0));

        const checkIn = await checkInsRepository.create({
            user_id: "user-01",
            gym_id: "gym-01",
        });

        vi.advanceTimersByTime(1000 * 60 * 21);

        await expect(() => sut.execute({
            checkInId: checkIn.id,
        })).rejects.toBeInstanceOf(LateCheckInValidateError);

    });
});
