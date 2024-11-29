// import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
// import { Type } from "@sinclair/typebox";

// const root: FastifyPluginAsyncTypebox = async (
//   fastify,
//   opts
// ): Promise<void> => {
//   fastify.route({
//     method: "GET",

//     url: "/",

//     schema: {
//       response: {
//         "2xx": Type.Object({
//           result: Type.String(),
//         }),
//       },
//     },

//     handler: async (request, reply) => {
//       reply.send({ result: "Hello World!" });
//     },
//   });
// };

// export default root;
