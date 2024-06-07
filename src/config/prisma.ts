import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const updatedAtExtension = {
  name: 'updatedAtExtension',
  model: {
    chats: {
      $beforeCreate: async (params: any, next: any) => {
        params.args.data.updated_at = new Date();
        return next(params);
      },
      $beforeUpdate: async (params: any, next: any) => {
        params.args.data.updated_at = new Date();
        return next(params);
      },
    },
  },
};

const prisma = prismaClient.$extends(updatedAtExtension);

export default prisma;
