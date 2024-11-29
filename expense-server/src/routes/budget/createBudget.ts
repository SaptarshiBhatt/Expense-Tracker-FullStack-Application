import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const root: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/",

    schema: {
      body: Type.Object({
        budget: Type.Number(),
      }),

      response: {
        "2xx": Type.Object({
          result: Type.Object({
            uid: Type.String(),
            budget: Type.Number(),
          }),
        }),

        "5xx": Type.Object({
          error: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const { budget } = request.body;
      try {
        const newBudget = await fastify.prisma.budget.create({
          data: {
            budget: budget,
          },
        });

        reply.send({ result: newBudget });
      } catch (error) {
        reply.code(500).send({ error: "Internal Server Error" });
      }
    },
  });
};

export default root;
