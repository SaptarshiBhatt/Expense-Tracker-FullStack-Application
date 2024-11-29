import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const root: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/:id",

    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        "2xx": Type.Object({
          result: Type.Object({
            uid: Type.String(),
            budget: Type.Number(),
          }),
        }),

        "4xx": Type.Object({
          error: Type.String(),
        }),

        "5xx": Type.Object({
          error: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const { id } = request.params;
      try {
        if (id) {
          const budget = await fastify.prisma.budget.findUnique({
            where: {
              uid: id,
            },
          });

          if (budget) {
            reply.send({ result: budget });
          } else {
            reply.code(404).send({ error: "Budget nor found" });
          }
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Server Error" });
      }
    },
  });
};

export default root;
