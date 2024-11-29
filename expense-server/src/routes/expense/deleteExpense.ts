import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const deleteExpense: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "DELETE",

    url: "/:id",

    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        "2xx": Type.Object({
          result: Type.Object({
            uid: Type.String(),
            title: Type.String(),
            amount: Type.Number(),
            category_name: Type.String(),
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
          const expense = await fastify.prisma.expenseitem.delete({
            where: {
              uid: id,
            },
          });
          reply.send({ result: expense });
        } else {
          reply.code(404).send({ error: "Expense Id not found" });
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Server error" });
      }
    },
  });
};

export default deleteExpense;
