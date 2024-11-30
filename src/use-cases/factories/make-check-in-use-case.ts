import { CheckInUseCase } from "../check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

export function makeCheckInUseCase(): CheckInUseCase {
    const checkInsRepository = new InMemoryCheckInsRepository();
    const gymsRepository = new InMemoryGymsRepository();
    const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    return checkInUseCase;
} 