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
  balance: number;
  governanceSlug: string;
};

type Response = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: SingleOrg;
};

const fetch = async (id: string | undefined): Promise<Response> => {
  const response = await instance.get<Response>(`/organization/${id}`).then((res) => res.data);
  return response;
};
export const useFetchSingleOrg = (id: string|undefined) =>
  useQuery({
    queryKey: ["useFetchSingleOrg", id],
    queryFn: () => fetch(id),
    staleTime: 0,
    enabled: !!id
  });
