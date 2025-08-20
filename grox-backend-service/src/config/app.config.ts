const appConfig = {
  app: {
    name: process.env.APP_NAME || "Groxcoin - Backend Service",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  },

  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtExpiration: process.env.JWT_EXPIRATION as string || "1h",

  server: {
    port: Number(process.env.PORT) || 8080,
  },
  exchange: {
    api: process.env.FETCH_PRICE_API || "https://api.exchangerate-api.com/v4/latest/USD"
  }

}

export default appConfig;
