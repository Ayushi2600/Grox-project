import express, { Application } from "express";
import { createServer, Server } from "http";
import routes from "@shared/routes/index.routes";
import bootstrapApp, { setErrorHandler } from "./bootstrap";
import RouteVersion from "@config/route.config";
import smileIdRoutes from "@v1/modules/kyc/routes/smileId.route";

class App {
  private app: Application;
  private server: Server;

  constructor() {
    this.app = express();

    bootstrapApp(this.app);

    this.registerModules();

    this.registerInvalidRoutes(this.app);
    setErrorHandler(this.app);

    this.server = createServer(this.app);
    
  }

  private registerModules() {
    this.app.use(routes.app);
    this.app.use(RouteVersion.v1, routes.auth);
    this.app.use(RouteVersion.v1, routes.exchange);
    this.app.use(RouteVersion.v1, routes.users);
    this.app.use(RouteVersion.v1, routes.waitlist);
    this.app.use(RouteVersion.v1 + "/kyc", smileIdRoutes);
  }

  private registerInvalidRoutes(app: Application) {
    app.use((req, res) => {
      res.status(404).json({ message: "Invalid Route" });
    });
  }

  public getInstance() {
    return this.app;
  }

  public async close() {
    if (this.server) {
      this.server.close();
    }

    // close other connections here...

  }

  public listen(port: number, address = "0.0.0.0") {
    return this.server.listen(port, address, () => {
      console.log(`Server listening on ${address}:${port}`);
    });
  }
}

export default App;
