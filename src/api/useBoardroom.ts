import { useQuery } from "@tanstack/react-query";
import axios from "axios";


type response = {
  data:{
    cname:string 
    name:string
    categories:string[]
    isEnabled:boolean
    activeOnWebsite:boolean
    totalProposals:number 
    totalVotes:number 
    uniqueVoters:number
    type:string 
    associatedProtocols:string[]
    associatedAddresses:string[]
    delegationSupport:string
    icons:{
        adapter:string
        size:string
        url:string
    }[]
  }[]
};

const fetch = async (): Promise<response> => {
  const response = await axios.get<response>(`${import.meta.env.VITE_Boardroom_API}/protocols?includeContractMetadata=false&excludeTokenInfo=true&key=${import.meta.env.VITE_Boardroom_Key}`)
    .then((res) => res.data);
  return response;
};
export const useBoardroom = () =>
  useQuery({
    queryKey: ["useBoardroom"],
    queryFn: () => fetch(),
    staleTime: 60 * (60 * 1000), // 60 mins
  });
