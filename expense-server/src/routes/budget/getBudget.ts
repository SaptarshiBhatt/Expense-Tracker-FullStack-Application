import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const root: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/",

    schema: {
      response: {
        "2xx": Type.Object({
          result: Type.Array(
            Type.Object({
              uid: Type.String(),
              budget: Type.Number(),
            })
          ),
        }),

        "5xx": Type.Object({
          error: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      try {
        const budget = await fastify.prisma.budget.findMany();

        reply.send({ result: budget });
      } catch (error) {
        reply.code(500).send({ error: "Internal Server Error" });
      }
    },
  });
};

export default root;
