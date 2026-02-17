import {createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure
    .query(({ ctx }) => { 
      // Correcting to use the right Prisma model (workflow, not workflows)
      return prisma.workflow.findMany();
    }),
    createWorkflow: protectedProcedure.mutation(async () => {
      await inngest.send({
        name:"test/hello.world",
        data:{
          email: "girishsharma1143@gmail.com",
        },
      });

      return { success: true, message: "Job queued" }
    })
});
export type AppRouter = typeof appRouter;