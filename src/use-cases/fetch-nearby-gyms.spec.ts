import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { Decimal } from "@prisma/client/runtime/library";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it("should be able to fetch nearby gyms", async () => {
        await gymsRepository.create({
            id: "e94024fc-de72-4716-9a72-4e52f623efe7",
            name: "Academia do Zé",
            description: "Academia do Zé",
            phone: "123456789",
            latitude: new Decimal(-8.8270525),
            longitude: new Decimal(-36.0098326),
        });

        await gymsRepository.create({
            id: "e94024fc-de72-4716-9a72-4e52f623efe7",
            name: "Academia do Mario",
            description: "Academia do Mario",
            phone: "123456789",
            latitude: new Decimal(-8.8270525),
            longitude: new Decimal(-36.0098326),
        });

        const { gyms } = await sut.execute({
            userLatitude: -8.8270525,
            userLongitude: -36.0098326,
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ name: "Academia do Zé" }),
            expect.objectContaining({ name: "Academia do Mario" }),
        ]);
    });

    it("should be able to fetch nearby gyms", async () => {
        await gymsRepository.create({
            id: "e94024fc-de72-4716-9a72-4e52f623efe7",
            name: "near gym",
            description: "near gym",
            phone: "123456789",
            latitude: new Decimal(-8.8270525),
            longitude: new Decimal(-36.0098326),
        });

        await gymsRepository.create({
            id: "e94024fc-de72-4716-9a72-4e52f623efe7",
            name: "far gym",
            description: "far gym",
            phone: "123456789",
            latitude: new Decimal(-8.670542),
            longitude: new Decimal(-35.7118429),
        });

        const { gyms } = await sut.execute({
            userLatitude: -8.8270525,
            userLongitude: -36.0098326,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ name: "near gym" })
        ]);
    });
});
