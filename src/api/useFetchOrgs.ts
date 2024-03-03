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
  size: number;
  chain: string;
  search: string;
};

const fetch = async ({ size, chain, search}: IProps): Promise<AllOrgRes> => {
  const response = await instance
    .get<AllOrgRes>(`/organization?searchParam=${search}&chain=${chain}&pageSize=${size}`)
    .then((res) => res.data);
  return response;
};
export const useFetchOrgs = ({ size, chain, search}: IProps) =>
  useQuery({
    queryKey: ["useFetchOrgs", size, chain, search],
    queryFn: () => fetch({ size, chain, search}),
    staleTime: 10 * (60 * 1000), // 10 mins
    placeholderData: (previousData) => previousData,
  });
