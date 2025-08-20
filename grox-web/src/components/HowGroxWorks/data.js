import Convert from './steps-icon/Convert.svg';
import FundWallet from './steps-icon/fundWallet.svg';
import GrowBalance from './steps-icon/Grow.svg';
import SendSwap from './steps-icon/Send.svg';

export const steps = [
  {
    icon: FundWallet,
    lineColor: '#822BB8',
    title: 'Fund Your Wallet',
    description:
      "Add money to your Grox wallet using dollars, naira, pounds, euros, or stablecoins like USDT or USDC. Choose what's easiest for you—whether it's your local currency or a crypto you already hold.",
  },
  {
    icon: Convert,
    lineColor: '#C92C2C',
    title: 'Convert to Grox',
    description:
      'Your funds convert to Grox at a rate tied to the U.S. dollar (e.g., 1 Grox = $1), adjusted with real-time exchange rates for naira, euros, or pounds to ensure fairness. Each Grox is backed by stable assets like bonds, treasury bills, etc.  working 24/7 to maintain its value and growth, regardless of your starting currency.',
  },
  {
    icon: GrowBalance,
    lineColor: '#15B763',
    title: 'Grow Your Balance',
    description:
      "Your Grox holdings increase in value as the backing assets generate returns—daily, weekly, or annually. Whether you're sleeping, working, or planning ahead, your balance grows steadily, reflecting the performance of those assets.",
  },
  {
    icon: SendSwap,
    lineColor: 'transparent',
    title: 'Hold, Send, Swap, or Cash Out Anytime',
    description:
      'Use your Grox however you like—keep it for future growth, send it to others, swap it for other currencies or crypto, or cash out to your bank account, all with flexibility and low fees.',
  },
];
