import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const getAllCategory: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/:category",

    schema: {
      params: Type.Object({
        category: Type.String(),
      }),

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
      const { category } = request.params;
      try {
        // Check if the category exists
        const existingCategory = await fastify.prisma.category.findUnique({
          where: {
            categoryName: category,
          },
        });

        if (existingCategory) {
          // Create the expense item
          const expense = await fastify.prisma.expenseitem.findMany({
            where: {
              category_name: category,
            },
          });

          reply.send({ result: expense });
        } else {
          reply.code(404).send({ error: "This category does not exists" });
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Error" });
      }
    },
  });
};

export default getAllCategory;
