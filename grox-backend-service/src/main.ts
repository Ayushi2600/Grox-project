import "module-alias/register";
import "reflect-metadata";

import 'dotenv/config';

import App from "./app/app";
import appConfig from "./config/app.config";


const app = new App();

const logger = console;

process
  .on("uncaughtException", (err) => {
    logger.error({ err });
    app.close();
    process.exit(1);
  })
  .on("SIGINT", () => {
    app.close();
    process.exit(0);
  });

app.listen(appConfig.server.port, "0.0.0.0").on("error", (err) => {
  logger.error({ err });
  process.exit(1);
});
