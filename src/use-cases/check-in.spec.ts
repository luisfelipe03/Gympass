import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-numer-of-check-ins";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("CheckIn Use Case", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
            name: "Academia 1",
            description: "Academia de rede",
            phone: "123456789",
            latitude: new Decimal(-8.8270525),
            longitude: new Decimal(-36.0098326),
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
            gymId: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
            userLatitude: -8.8270525,
            userLongitude: -36.0098326,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice on the same day", async () => {
        vi.setSystemTime(new Date(2020, 0, 1, 12, 0, 0));

        await sut.execute({
            userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
            gymId: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
            userLatitude: -8.8270525,
            userLongitude: -36.0098326,
        });

        await expect(
            async () =>
                await sut.execute({
                    userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
                    gymId: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
                    userLatitude: -8.8270525,
                    userLongitude: -36.0098326,
                })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    it("should not be able to check in twice but on different days", async () => {
        vi.setSystemTime(new Date(2020, 0, 1));

        await sut.execute({
            userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
            gymId: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
            userLatitude: -8.8270525,
            userLongitude: -36.0098326,
        });

        vi.setSystemTime(new Date(2020, 0, 2));

        const { checkIn } = await sut.execute({
            userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
            gymId: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
            userLatitude: -8.8270525,
            userLongitude: -36.0098326,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should mot be able to check in on distant gym", async () => {
        await expect(() =>
            sut.execute({
                userId: "9a1b7ca0-f071-4d1a-972e-4da1229f3ba9",
                gymId: "2553d5b5-b0b9-44d9-b140-16577ff1d99b",
                userLatitude: -8.765022,
                userLongitude: -35.9018005,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError);
    });
});
