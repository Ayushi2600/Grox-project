import axios from 'axios';
import { EXCHANGE_API} from '../../../constants/api';

export const getFiatExchangeRates = async () => {
  try {
    const response = await axios.get(`${EXCHANGE_API}/fiat-exchange-rates`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch exchange rates', error);
    throw error;
  }
};