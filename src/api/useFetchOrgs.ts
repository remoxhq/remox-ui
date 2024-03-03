import { useQuery } from "@tanstack/react-query";
import instance from "./axiosInstance";

type SingleOrg = {
  _id: string;
  name: string;
  dashboardLink: string;
  website: string;
  github: string;
  discord: string;
  twitter: string;
  isPrivate: boolean;
  createdBy: string;
  isVerified: boolean;
  image: string;
  accounts: {
    name: string;
    address: string;
    chain: string;
  }[];
  createdDate: string;
  networks: {
    [key: string]: string;
  };
  isActive: boolean;
  isDeleted: boolean;
  isFavorited: boolean;
  balance:number
  governanceSlug:string
};

type AllOrgRes = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: {
    items: SingleOrg[];
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
