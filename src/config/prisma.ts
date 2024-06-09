import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  query: {
    $allOperations({ model, operation, args, query }) {
      if(model === 'Chats' && ['update', 'updateMany'].includes(operation)) {
        console.log(args.data.updated_at, 77)
        args.data.updated_at = new Date()
      }

      return query(args)
    },
  },
});

export default prisma;
