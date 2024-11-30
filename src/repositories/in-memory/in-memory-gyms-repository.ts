import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";


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
    
}