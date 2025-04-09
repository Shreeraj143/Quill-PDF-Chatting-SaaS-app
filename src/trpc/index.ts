import { currentUser } from "@clerk/nextjs/server";
import { publicProcedure, router, privateProcedure } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();

    if (!user?.id || !user?.emailAddresses[0].emailAddress)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    //   Check if the user is in db
    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
        },
      });
    }

    return { success: true };
  }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
