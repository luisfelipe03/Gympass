import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

export function makeCheckInUseCase(): CheckInUseCase {
    const checkInsRepository = new InMemoryCheckInsRepository();
    const checkInUseCase = new CheckInUseCase(checkInsRepository);

    return checkInUseCase;
} 