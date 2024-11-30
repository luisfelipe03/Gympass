import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeRegisterUseCase(): CreateGymUseCase {
    const gymRepository = new InMemoryGymsRepository();
    const createGymUseCase = new CreateGymUseCase(gymRepository);

    return createGymUseCase;
}