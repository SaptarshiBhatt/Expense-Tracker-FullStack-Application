import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const updateExpense: FastifyPluginAsyncTypebox = async (
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
        title: Type.Optional(Type.String()),
        amount: Type.Optional(Type.Number()),
        category_name: Type.Optional(Type.String()),
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
      const { category_name, ...rest } = request.body;
      const { id } = request.params;

      try {
        // Check if the category exists
        const existingCategory = await fastify.prisma.category.findUnique({
          where: {
            categoryName: category_name,
          },
        });

        // If the category doesn't exist, create it
        if (!existingCategory && category_name) {
          await fastify.prisma.category.create({
            data: {
              categoryName: category_name,
            },
          });
        }

        if (id) {
          const updated_expense = await fastify.prisma.expenseitem.update({
            where: {
              uid: id,
            },
            data: {
              ...rest,
              category: {
                connect: {
                  categoryName: category_name,
                },
              },
            },
          });

          if (updated_expense) {
            reply.send({ result: updated_expense });
          } else {
            reply.code(404).send({ error: "Expense not found" });
          }
        } else {
          reply.code(404).send({ error: "Expense id not found" });
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Server error" });
      }
    },
  });
};

export default updateExpense;
