import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
    statusCode: number;
    success: true;
    result: {
        assets: AssetDto[],
        assetsByBlockchain: AssetByBlockchainDto[]
    };
};

export interface AssetByBlockchainDto {
    blockchain: string,
    totalAssetUsdValue: number,
    topHolding: string,
    topHoldingUrl: string,
    top3HoldingsUrls: string[],
    assets: AssetDto[]
}

export interface AssetDto {
    decimals: number,
    symbol: string,
    address: string,
    logo: string,
    quote: number,
    quote_rate: number,
    balance: number
    uniqueKey: string
}

type AllResponse = undefined | Response

const fetch = async (accounts: any): Promise<AllResponse> => {
    if (!accounts) {
        return undefined;
    }

    const body = accounts.map(account => ({ address: account.address, chain: account.chain }))
    const response = await axios.post<Response>(`${import.meta.env.VITE_Base_API}/treasury/assets`, { wallets: body }).then((res) => res.data);
    return response;
};
export const useFetchAssets = (accounts: any) =>
    useQuery({
        queryKey: ["useFetchAssets", accounts],
        queryFn: () => fetch(accounts),
        staleTime: 10 * (60 * 1000), //10 mins
        enabled: !!accounts,
    });
