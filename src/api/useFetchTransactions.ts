import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  statusCode: number;
  success: boolean;
  result: {
    txs: {
      id:string
      hash: string;
      assetName: string;
      assetLogo: string;
      from: string;
      to: string;
      direction: string;
      count: number;
      amount: number;
      date: string;
      chain: string;
    }[];
    next:string | undefined
  };
};

type IProps = string | undefined;

const fetch = async (dashboardLink: IProps,pageParam:string): Promise<Response | undefined> => {
  if (!dashboardLink) {
    return undefined;
  }
  const transformedParam = pageParam.length >10 ? pageParam : JSON.stringify(pageParam)
  const response = await axios.get<Response>(`${import.meta.env.VITE_Base_API}/treasury/txs/${dashboardLink}/${transformedParam}`).then((res) => res.data);
  return response;
};
export const useFetchTransactions = (dashboardLink: IProps) =>
  useInfiniteQuery({
    queryKey: ["useFetchTransactions", dashboardLink],
    queryFn: ({pageParam}) => fetch(dashboardLink,pageParam),
    staleTime: 10 * (60 * 1000), //10 mins
    enabled: !!dashboardLink,
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.result.next ? lastPage?.result.next : undefined,
  });
