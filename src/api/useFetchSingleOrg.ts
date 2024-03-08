import { useQuery } from "@tanstack/react-query";
import instance from "./axiosInstance";
import { SingleOrgProp } from "@typeDecleration/index";
import '@tanstack/react-query'
import { AxiosError } from "axios";

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}

type Response = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: SingleOrgProp;
};

const fetch = async (slug: string | undefined): Promise<Response> => {
  const response = await instance.get<Response>(`/organization/${slug}`).then((res) => res.data);
  return response;
};
export const useFetchSingleOrg = (slug: string|undefined) =>
  useQuery({
    queryKey: ["useFetchSingleOrg", slug],
    queryFn: () => fetch(slug),
    staleTime: 10 * (60 * 1000), //10 mins
    enabled: !!slug
  });
