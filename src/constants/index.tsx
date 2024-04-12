import { StaticProposalsType } from "@typeDecleration/index";

export const chains = [
  {
    id: 0,
    name: "Ethereum",
    value: "eth-mainnet",
    logo: "/img/chains/eth.png",
  },
  {
    id: 1,
    name: "Celo",
    value: "celo-mainnet",
    logo: "/img/chains/celo.png",
  },
  {
    id: 2,
    name: "Arbitrum",
    value: "arbitrum-mainnet",
    logo: "/img/chains/arb.png",
  },
  {
    id: 3,
    name: "Avalanche",
    value: "avalanche-mainnet",
    logo: "/img/chains/avax.png",
  },
  {
    id: 4,
    name: "Binance",
    value: "bsc-mainnet",
    logo: "/img/chains/bnb.png",
  },
  {
    id: 5,
    name: "Polygon",
    value: "matic-mainnet",
    logo: "/img/chains/matic.png",
  },
  {
    id: 6,
    name: "Optimism",
    value: "optimism-mainnet",
    logo: "/img/chains/op.png",
  },
  {
    id: 7,
    name: "Gnosis",
    value: "gnosis-mainnet",
    logo: "/img/chains/gnosis.png",
  },
  {
    id: 8,
    name: "Cronos",
    value: "cronos-mainnet",
    logo: "/img/chains/cronos.webp",
  },
  {
    id: 9,
    name: "Base",
    value: "base-mainnet",
    logo: "/img/chains/base.png",
  },
  {
    id: 10,
    name: "Fantom",
    value: "fantom-mainnet",
    logo: "/img/chains/fantom.webp",
  },
];

export const chainsKeyValue = {
  ["eth-mainnet"]: {
    id: 0,
    name: "Ethereum",
    value: "eth-mainnet",
    logo: "/img/chains/eth.png",
  },
  ["celo-mainnet"]: {
    id: 1,
    name: "Celo",
    value: "celo-mainnet",
    logo: "/img/chains/celo.png",
  },
  ["arbitrum-mainnet"]: {
    id: 2,
    name: "Arbitrum",
    value: "arbitrum-mainnet",
    logo: "/img/chains/arb.png",
  },
  ["avalanche-mainnet"]: {
    id: 3,
    name: "Avalanche",
    value: "avalanche-mainnet",
    logo: "/img/chains/avax.png",
  },
  ["bsc-mainnet"]: {
    id: 4,
    name: "Binance",
    value: "bsc-mainnet",
    logo: "/img/chains/bnb.png",
  },
  ["matic-mainnet"]: {
    id: 5,
    name: "Polygon",
    value: "matic-mainnet",
    logo: "/img/chains/matic.png",
  },
  ["optimism-mainnet"]: {
    id: 6,
    name: "Optimism",
    value: "optimism-mainnet",
    logo: "/img/chains/op.png",
  },
  ["gnosis-mainnet"]: {
    id: 7,
    name: "Gnosis",
    value: "gnosis-mainnet",
    logo: "/img/chains/gnosis.png",
  },
  ["cronos-mainnet"]: {
    id: 8,
    name: "Cronos",
    value: "cronos-mainnet",
    logo: "/img/chains/cronos.webp",
  },
  ["base-mainnet"]: {
    id: 9,
    name: "Base",
    value: "base-mainnet",
    logo: "/img/chains/base.png",
  },
  ["fantom-mainnet"]: {
    id: 10,
    name: "Fantom",
    value: "fantom-mainnet",
    logo: "/img/chains/fantom.webp",
  },
} as const;

export const scans = {
  "eth-mainnet": "https://etherscan.io/tx/",
  "celo-mainnet": "https://celoscan.io/tx/",
  "arbitrum-mainnet": "https://arbiscan.io/tx/",
  "avalanche-mainnet": "https://snowtrace.io/tx/",
  "bsc-mainnet": "https://bscscan.com/tx/",
  "matic-mainnet": "https://polygonscan.com/tx/",
  "optimism-mainnet": "https://optimistic.etherscan.io/tx/",
  "gnosis-mainnet": "https://gnosisscan.io/tx/",
  "cronos-mainnet": "https://cronoscan.com/tx/",
  "base-mainnet": "https://basescan.org/tx/",
  "fantom-mainnet": "https://ftmscan.com/tx/",
};

export const staticProposals: StaticProposalsType = {
  celopg: [
    {
      id: 0,
      title: "Revised Celo Governance Guidelines and Public Goods Funding Strategy H1 2024",
      start: "11 Jan,2024, 22:16",
      end: "9 Feb,2024, 19:12",
      currentState: "executed",
      totalVotes: 54,
      url: "https://celo.stake.id/#/proposal/157",
    },
  ],
  celofund: [
    {
      id: 0,
      title: "Mento Reserve Returning CELO",
      start: "27 Feb,2023, 21:00",
      end: "21 Apr,2023, 16:24",
      currentState: "executed",
      totalVotes: 51,
      url: "https://celo.stake.id/#/proposal/102",
    },
    {
      id: 1,
      title: "Activation of Celo Community Fund",
      start: "1 Dec,2020, 22:16",
      end: "2 Feb,2021, 10:23",
      currentState: "executed",
      totalVotes: 120,
      url: "https://celo.stake.id/#/proposal/18",
    },
  ],
  prezenti: [
    {
      id: 0,
      title: "Prezenti H1 2024 | Celo Grants | CPG Funding Request - Grants & RPFs",
      start: "12 Feb,2024, 22:44",
      end: "8 Mar,2024, 01:13",
      currentState: "executed",
      totalVotes: 47,
      url: "https://celo.stake.id/#/proposal/162",
    },
    {
      id: 1,
      title: "Prezenti (Celo Community Fund) stewardship follow-on funding request",
      start: "3 Feb,2023, 22:08",
      end: "28 Mar,2023, 22:50",
      currentState: "executed",
      totalVotes: 86,
      url: "https://celo.stake.id/#/proposal/89",
    },
    {
      id: 2,
      title: "Reopening of the Celo Community Fund",
      start: "4 May,2022, 02:04",
      end: "11 Jun,2022, 04:10",
      currentState: "executed",
      totalVotes: 80,
      url: "https://celo.stake.id/#/proposal/61",
    },
  ],
} as const;
