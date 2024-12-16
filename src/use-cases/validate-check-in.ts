import { CheckIn, Gym } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-numer-of-check-ins";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "./errors/late-check-in-validate";

interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({
        checkInId
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        if (checkIn.validated_at) {
            throw new Error("Check-in already validated");
        }

        const distanceInMinutesFromCheckInCreation = dayjs().diff(dayjs(checkIn.created_at), "minute");

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidateError();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}
