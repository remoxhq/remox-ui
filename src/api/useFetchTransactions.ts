import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

type TxsResponse = {
  id: string;
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
};
type Response = {
  statusCode: number;
  success: boolean;
  result: {
    txs: TxsResponse[];
    next: string | undefined;
  };
};

type IProps = string | undefined;

const fetch = async (dashboardLink: IProps, pageParam: string): Promise<Response | undefined> => {
  if (!dashboardLink) {
    return undefined;
  }
  const transformedParam = pageParam.length > 10 ? pageParam : JSON.stringify(pageParam);
  const response = await axios.get<Response>(`${import.meta.env.VITE_Base_API}/treasury/txs/${dashboardLink}/${transformedParam}`).then((res) => res.data);
  return response;
};
export const useFetchTransactions = (dashboardLink: IProps) =>
  useInfiniteQuery({
    queryKey: ["useFetchTransactions", dashboardLink],
    queryFn: ({ pageParam }) => fetch(dashboardLink, pageParam),
    staleTime: 10 * (60 * 1000), //10 mins
    enabled: !!dashboardLink,
    initialPageParam: "",
    getNextPageParam: (lastPage) => (lastPage?.result.next ? lastPage?.result.next : undefined),
    select: (data) => {
      const flattenedTxs: TxsResponse[] = [];
      for (const page of data.pages) {
        if (page?.result?.txs) {
          flattenedTxs.push(...page.result.txs);
        }
      }
      const result = flattenedTxs.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
      return result;
    },
  });
