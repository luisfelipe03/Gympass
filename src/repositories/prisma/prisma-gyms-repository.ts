import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        });

        return gym;
    }

    async findManyNearby({
        latitude,
        longitude,
    }: FindManyNearbyParams): Promise<Gym[]> {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT  * FROM gyms
            WHERE (6371 * ACOS(
                    COS(RADIANS(${latitude})) 
                    * COS(RADIANS(latitude)) 
                    * COS(RADIANS(longitude) - RADIANS(${longitude})) 
                    + SIN(RADIANS(${latitude})) 
                    * SIN(RADIANS(latitude))
                )) <= 10
            ORDER BY distancia ASC;
        `;

        return gyms;
    }

    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
            skip: (page - 1) * 20,
            take: 20,
        });

        return gyms;
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        });

        return gym;
    }
}
