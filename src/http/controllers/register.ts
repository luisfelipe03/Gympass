import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { RegisterUserUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exists";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerUserSchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUser = new RegisterUserUseCase(usersRepository);

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
