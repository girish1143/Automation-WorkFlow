import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure
    .query(({ ctx }) => { 

      return prisma.user.findMany({
        where: {
          id: ctx.userId,
        }
      });
    }),
});
export type AppRouter = typeof appRouter;