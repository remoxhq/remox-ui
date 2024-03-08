import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  statusCode: number;
  success: true;
  result: {
    _id: string;
    name: string;
    addresses: string[];
    existingTokens: {
      [key: string]: {
        symbol: string,
        logo: string,
        chain: string
      };
    };
    annual: {
      [key: string]: {
        totalTreasury: number;
        tokenBalances: {
          [key: string]: {
            balanceUsd: number,
            tokenCount: number,
            tokenUsdValue: number
          };
        };
        networkBalances: {
          [key: string]: number;
        };
      };
    };
  };
};

type AllResponse = undefined | Response

const fetch = async (dashboardLink: string | undefined): Promise<AllResponse> => {
  if (!dashboardLink || dashboardLink === "") {
    return undefined;
  }
  const response = await axios.get<Response>(`${import.meta.env.VITE_Base_API}/treasury/balance/${dashboardLink}`).then((res) => res.data);
  return response;
};
export const useFetchPortfolioHistory = (dashboardLink: string | undefined) =>
  useQuery({
    queryKey: ["useFetchPortfolioHistory", dashboardLink],
    queryFn: () => fetch(dashboardLink),
    staleTime: 10 * (60 * 1000), //10 mins
    enabled: !!dashboardLink,
  });
