import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/autheticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const userRepository = new PrismaUsersRepository();
        const authenticateUser = new AuthenticateUseCase(userRepository);

        await authenticateUser.execute({ email, password });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            reply.status(400).send({
                message: error.message,
            });
        }
    }

    reply.status(200).send();
}
