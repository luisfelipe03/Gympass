import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";


export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = [];

    async findById(id: string) {
        return this.items.find(gym => gym.id === id) ?? null;
    }

    async create(data: Gym) {
        const gym = {
            id: data.id ?? randomUUID(),
            name: data.name,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: data.latitude,
            longitude: data.longitude,
        }

        this.items.push(gym);

        return gym;
    }

    async searchMany(query: string, page: number) {
        return this.items.filter(gym => gym.name.includes(query)).slice((page - 1) * 20, page * 20); 
    }

    async findManyNearby(params: { latitude: number; longitude: number; }) {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: item.latitude!.toNumber(), longitude: item.longitude!.toNumber() },
            )

            return distance < 10;
        })
    }
    
}