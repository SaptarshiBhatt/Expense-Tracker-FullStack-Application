import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const createExpense: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/",

    schema: {
      body: Type.Object({
        title: Type.String(),
        amount: Type.Number(),
        category_name: Type.String(),
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

        "5xx": Type.Object({
          error: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const { category_name, ...rest } = request.body;
      try {
        // Check if the category exists
        const existingCategory = await fastify.prisma.category.findUnique({
          where: {
            categoryName: category_name,
          },
        });

        // If the category doesn't exist, create it
        if (!existingCategory) {
          await fastify.prisma.category.create({
            data: {
              categoryName: category_name,
            },
          });
        } else {
          // Create the expense item
          const expense = await fastify.prisma.expenseitem.create({
            data: {
              ...rest,
              category: {
                connect: {
                  categoryName: category_name,
                },
              },
            },
          });

          reply.send({ result: expense });
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Error" });
      }
    },
  });
};

export default createExpense;
