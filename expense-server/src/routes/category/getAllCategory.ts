import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const getAllCategory: FastifyPluginAsyncTypebox = async (
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
              categoryName: Type.String(),
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
        // Create the expense item
        const expense = await fastify.prisma.category.findMany();

        reply.send({ result: expense });
      } catch (error) {
        reply.code(500).send({ error: "Internal Error" });
      }
    },
  });
};

export default getAllCategory;
