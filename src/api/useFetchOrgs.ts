import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "./axiosInstance";
import { SingleOrgProp } from "@typeDecleration/index";

type AllOrgRes = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: {
    items: SingleOrgProp[];
    pageSize: number;
    pageIndex: number;
    totalPages: number;
    totalCount: number;
  };
};

type IProps = {
  pageParam: number;
  chain: string;
  search: string;
};

const fetch = async ({ pageParam, chain, search }: IProps): Promise<AllOrgRes> => {
  const response = await instance.get<AllOrgRes>(`/organization?searchParam=${search}&chain=${chain}&pageSize=24&pageIndex=${pageParam}`).then((res) => res.data);
  return response;
};

export const useFetchOrgs = ( chain:string, search:string ) =>
  useInfiniteQuery({
    queryKey: ["useFetchOrgs", chain, search],
    queryFn: ({pageParam}) => fetch({ pageParam, chain, search }),
    staleTime: 10 * (60 * 1000), // 10 mins
    initialPageParam: 0,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage, pages) => {
      const totalFetchedTx = pages.reduce((total, page) => total + page.result.pageSize, 0);
      if (totalFetchedTx < lastPage.result.totalCount) {
        return lastPage.result.pageIndex + 1;
      } else return undefined;
    },
  });
