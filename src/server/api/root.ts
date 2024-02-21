import { adminAccountsRouter } from "./routers/admin";
import { driverRouter } from "./routers/driver";
import { loginRouter } from "./routers/login";
import { pasaheroRouter } from "./routers/pasahero";
import { vehicleTypeRouter } from "./routers/vehicletype";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  login: loginRouter,
  admin: adminAccountsRouter,
  vehicleType: vehicleTypeRouter,
  driver: driverRouter,
  pasahero: pasaheroRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
