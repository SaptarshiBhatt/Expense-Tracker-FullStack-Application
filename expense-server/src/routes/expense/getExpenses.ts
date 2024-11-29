import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const getExpenses: FastifyPluginAsyncTypebox = async (
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
              title: Type.String(),
              amount: Type.Number(),
              category_name: Type.String(),
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
        const expenses = await fastify.prisma.expenseitem.findMany();
        reply.send({ result: expenses });
      } catch (error) {
        // Log the error
        console.error("Error fetching expenses:", error);

        // Reply with an error response
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  });
};

export default getExpenses;
