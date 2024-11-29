import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerUserSchema.parse(request.body);

    try {
        const registerUser = makeRegisterUseCase();

        await registerUser.execute({ name, email, password });
    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            reply.status(409).send({
                message: error.message,
            });
        }
        throw error;
    }

    reply.status(201).send();
}
