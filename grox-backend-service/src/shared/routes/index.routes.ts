import appRoute from "@v1/modules/app/app.route";
import authRoutes from "@v1/modules/auth/routes/auth.route";
import exchangeRoutes from "@v1/modules/exchange/routes/exchange.route";
import userRoutes from "@v1/modules/users-management/routes/user.routes";
import waitlistRoutes from "@v1/modules/users-management/routes/waitlist.route";
import kycRoutes from "@v1/modules/kyc/routes/smileId.route";

const routes = {
  app: appRoute,
  auth: authRoutes,
  exchange: exchangeRoutes,
  users: userRoutes,
  waitlist: waitlistRoutes,
  kyc: kycRoutes
}

export default routes;
