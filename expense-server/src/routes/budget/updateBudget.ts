import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const root: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "PATCH",

    url: "/:id",

    schema: {
      params: Type.Object({
        id: Type.String(),
      }),

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
      const { budget } = request.body;
      try {
        if (id) {
          const updatedBudget = await fastify.prisma.budget.update({
            where: {
              uid: id,
            },
            data: {
              budget: budget,
            },
          });

          if (updatedBudget) {
            reply.send({ result: updatedBudget });
          } else {
            reply.code(404).send({ error: "Budget Not Found" });
          }
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Server Error" });
      }
    },
  });
};

export default root;
