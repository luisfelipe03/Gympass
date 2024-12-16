import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it("should be able to search gyms", async () => {
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
            query: "Zé",
            page: 1,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ name: "Academia do Zé" }),
        ]);
    });

    it("should be able to search gyms paginated", async () => {
        for (let i = 0; i <= 22; i++) {
            await gymsRepository.create({
                id: "e94024fc-de72-4716-9a72-4e52f623efe7",
                name: `Academia ${i}`,
                description: `Academia ${i}`,
                phone: "123456789",
                latitude: new Decimal(-8.8270525),
                longitude: new Decimal(-36.0098326),
            });
        }

        const { gyms } = await sut.execute({
            query: "Academia",
            page: 2,
        });

        expect(gyms).toHaveLength(3);
        expect(gyms).toEqual([
            expect.objectContaining({ name: "Academia 20" }),
            expect.objectContaining({ name: "Academia 21" }),
            expect.objectContaining({ name: "Academia 22" }),
        ]);
    });
});
