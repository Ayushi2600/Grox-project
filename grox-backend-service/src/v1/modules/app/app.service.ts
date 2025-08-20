import appConfig from "@config/app.config";
import { injectable } from "tsyringe";

@injectable()
class AppService {

  getHello() {
    return {
      service: appConfig.app.name,
      version: '1.0.0',
    };
  }
}

export default AppService;
