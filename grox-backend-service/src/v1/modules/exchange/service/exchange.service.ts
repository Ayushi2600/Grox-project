import appConfig from "@config/app.config";
import { injectable } from "tsyringe";
import axios from "axios";

@injectable()
class ExchangeService {

  async getFiatExchangeRates() {

    const exchangeApi = appConfig.exchange.api;
    const response = await axios.get<{ conversion_rates: Record<string, number> }>(exchangeApi);
    const rates = response.data.conversion_rates;

    const countryRes = await axios.get("https://restcountries.com/v3.1/all?fields=currencies,cca2");
    const countries = countryRes.data as any;

    const currencyMap: Record<string, { countryCode: string; symbol: string }> = {};

    for (const country of countries) {
      if (!country.currencies || !country.cca2) continue;

      for (const currencyCode of Object.keys(country.currencies)) {
        if (!currencyMap[currencyCode]) {
          currencyMap[currencyCode] = {
            countryCode: country.cca2,
            symbol: country.currencies[currencyCode]?.symbol || currencyCode,
          };
        }
      }
    }

    const responseWithFlags: Record<string, { rate: number; flag: string | null; symbol: string }> = {};

    for (const [currency, rate] of Object.entries(rates)) {
      const entry = currencyMap[currency];

      responseWithFlags[currency] = {
        rate: rate as number,
        flag: entry ? `https://flagsapi.com/${entry.countryCode}/flat/64.png` : null,
        symbol: entry ? entry.symbol : currency, // fallback to currency code
      };
    }


    // Add USDC & USDT manually
    responseWithFlags['USDC'] = {
      rate: 1,
      flag: 'https://flagsapi.com/US/flat/64.png',
      symbol: '$',
    };
    responseWithFlags['USDT'] = {
      rate: 1,
      flag: 'https://flagsapi.com/US/flat/64.png',
      symbol: '$',
    };

    return responseWithFlags;
  }
}

export default ExchangeService;
