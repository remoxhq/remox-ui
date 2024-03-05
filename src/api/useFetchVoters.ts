import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  nextCursor: string;
  data: {
    address: string;
    firstVoteCast: number;
    lastVoteCast: number;
    totalVotesCast: number;
    protocols: {
      protocol: string;
      totalVotesCast: number;
      lastVoteCast: number;
      firstVoteCast: number;
      totalPowerCast: number;
      lastCastPower: number;
    }[];
  }[];
};

const fetch = async (governanceLink: string | undefined): Promise<Response> => {
  if (!governanceLink || governanceLink === "") {
    return { nextCursor: "", data: [] };
  }
  const response = await axios
    .get<Response>(`${import.meta.env.VITE_Boardroom_API}/protocols/${governanceLink}/voters?limit=50&key=${import.meta.env.VITE_Boardroom_Key}`)
    .then((res) => res.data);
  return response;
};
export const useFetchVoters = (governanceLink: string | undefined) =>
  useQuery({
    queryKey: ["useFetchVoters", governanceLink],
    queryFn: () => fetch(governanceLink),
    staleTime: 10 * (60 * 1000), //10 mins
    enabled: !!governanceLink,
    select: (data) => {
      if (!governanceLink || data.data.length === 0) {
        return undefined;
      }
      const sorted = data.data.sort((a, b) => {
        const protocolA = a.protocols.find((x) => x.protocol === governanceLink);
        const protocolB = b.protocols.find((x) => x.protocol === governanceLink);
        return protocolB!.lastCastPower - protocolA!.lastCastPower;
      });

      return sorted;
    },
  });
