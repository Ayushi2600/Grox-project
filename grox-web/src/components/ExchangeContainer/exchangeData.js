// =============================================================================
// EXCHANGE DATA FOR EXCHANGE CONTAINER
// =============================================================================

// Import currency icons
import USDIcon from './USD.svg';
import NGNIcon from './NGN.svg';
import GBPIcon from './GBP.svg';
import USDTIcon from './USDT.svg';
import USDCIcon from './USDC.svg';
import EURIcon from './EUR.svg';

import CanadaFlag from './countries/canada.svg';
import NigeriaFlag from './countries/nigeria.svg';
import UnitedKingdomFlag from './countries/united-kingdom.svg';
import UnitedStatesFlag from './countries/usa.svg';
import UAEFlag from './countries/uae.svg';
import GermanyFlag from './countries/germany.svg';
import FranceFlag from './countries/france.svg';
import SouthAfricaFlag from './countries/south-africa.svg';
import SpainFlag from './countries/spain.svg';

// Exchange rates (1 GROX = 1 USD base rate)
export const exchangeRates = [
  {
    currency: 'USD',
    symbol: '$',
    rate: 1.0,
    icon: USDIcon,
  },
  {
    currency: 'NGN',
    symbol: '₦',
    rate: 1620.0,
    icon: NGNIcon,
  },
  {
    currency: 'GBP',
    symbol: '£',
    rate: 0.74,
    icon: GBPIcon,
  },
  {
    currency: 'USDT',
    symbol: '$',
    rate: 1.0,
    icon: USDTIcon,
  },
  {
    currency: 'USDC',
    symbol: '$',
    rate: 1.0,
    icon: USDCIcon,
  },
  {
    currency: 'EUR',
    symbol: '€',
    rate: 0.88,
    icon: EURIcon,
  },
];

// Country flags for the side panel
export const countryFlags = [
  UnitedStatesFlag,
  UnitedKingdomFlag,
  NigeriaFlag,
  GermanyFlag,
  CanadaFlag,
  FranceFlag,
  SouthAfricaFlag,
  SpainFlag,
];

// Stats data
export const statsData = {
  registeredUsers: '54,215',
  countries: '100+',
};

// Helper function to format exchange rate
export const formatExchangeRate = (rate, amount = 1) => {
  const calculatedRate = rate * amount;

  if (rate >= 1000) {
    return calculatedRate.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    return calculatedRate.toFixed(2);
  }
};
