import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const createCategory: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/",

    schema: {
      body: Type.Object({
        categoryName: Type.String(),
      }),
      response: {
        "2xx": Type.Object({
          result: Type.Object({
            uid: Type.String(),
            categoryName: Type.String(),
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
      const { categoryName } = request.body;
      try {
        // Check if the category exists
        const existingCategory = await fastify.prisma.category.findUnique({
          where: {
            categoryName: categoryName,
          },
        });

        // If the category doesn't exist, create it
        if (!existingCategory) {
          const newCategory = await fastify.prisma.category.create({
            data: {
              categoryName: categoryName,
            },
          });
          reply.send({ result: newCategory });
        } else {
          reply.code(409).send({ error: "This Category Already Exists" });
        }
      } catch (error) {
        reply.code(500).send({ error: "Internal Error" });
      }
    },
  });
};

export default createCategory;
