import { useQuery } from "@tanstack/react-query";
import instance from "./axiosInstance";
import { SingleOrgProp } from "@typeDecleration/index";


type Response = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: SingleOrgProp;
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
