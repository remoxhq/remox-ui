import { useQuery } from "@tanstack/react-query";
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
  chain: string;
  search: string;
};

const fetch = async ({ chain, search}: IProps): Promise<AllOrgRes> => {
  const response = await instance
    .get<AllOrgRes>(`/organization?searchParam=${search}&chain=${chain}&favOnly=true`)
    .then((res) => res.data);
  return response;
};
export const useFetchFavorites = ({ chain, search}: IProps) =>
  useQuery({
    queryKey: ["useFetchFavorites", chain, search],
    queryFn: () => fetch({ chain, search}),
    staleTime: 10 * (60 * 1000), // 10 mins
    // placeholderData: (previousData) => previousData,
  });
