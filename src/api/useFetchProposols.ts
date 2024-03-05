import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  nextCursor: string;
  data: {
    refId:string 
    id:string 
    title:string 
    content:string 
    protocol:string 
    adapter:string 
    proposer:string 
    totalVotes:number 
    blockNumber:number 
    externalUrl:string 
    startTime:{timestamp:number}
    endTime:{timestamp:number} 
    startTimestamp:string 
    endTimestamp:string 
    currentState:string 
    choices:string[]
    // results:[]
    // events:[]
    type:string 
    indexedResult:[]
    summary:string 
    privacy:string 
    indexedAt:number 
    // executables:{}
    txHash:string 
    quorum:number 
    flagged:null | boolean
    // executionArgs:{}
    chainId:null | string
  }[];
};

const fetch = async (governanceLink: string | undefined): Promise<Response> => {
  if (!governanceLink || governanceLink === "") {
    return { nextCursor: "", data: [] };
  }
  const response = await axios
    .get<Response>(`${import.meta.env.VITE_Boardroom_API}/protocols/${governanceLink}/proposals?limit=50&orderByIndexedAt=desc&key=${import.meta.env.VITE_Boardroom_Key}`)
    .then((res) => res.data);
  return response;
};
export const useFetchProposols = (governanceLink: string | undefined) =>
  useQuery({
    queryKey: ["useFetchProposols", governanceLink],
    queryFn: () => fetch(governanceLink),
    staleTime: 10 * (60 * 1000), //10 mins
    enabled: !!governanceLink,
    
  });
