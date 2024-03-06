import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/shadcn/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/shadcn/table";
import { Zap } from "lucide-react";
import NR from "@utils/numberReducer";
import EmptyCard from "@components/general/emptyCard";
import { useParams } from "react-router-dom";
import { useFetchSingleOrg } from "@/api/useFetchSingleOrg";
import { useFetchVoters } from "@/api/useFetchVoters";
import { AddressReducer } from "@utils/addressReducer";
import SyncLoader from "react-spinners/SyncLoader";
import { useFetchProposols } from "@/api/useFetchProposols";
import dayjs from "dayjs";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";

function Governance() {
  const openLink = (url: string) => {
    window.open(`${url}`, "_blank");
  };
  const { slug } = useParams();
  const { data } = useFetchSingleOrg(slug);
  const { data: voters, isPending: votersPending, isSuccess: votersSuccess, isError: votersError, isLoading: votersLoading } = useFetchVoters(data?.result.governanceSlug);
  const {
    data: proposols,
    isPending: proposalsPending,
    isSuccess: proposalsSuccess,
    isError: proposalsError,
    isLoading: proposolsLoading,
  } = useFetchProposols(data?.result.governanceSlug);

  
  return (
    <div className="bg-darkBlue rounded-xl p-3 w-full h-[360px] border overflow-hidden">
      <Tabs defaultValue="proposals" className="w-full h-full">
        <TabsList className="w-full bg-transparent gap-10 p-0 h-auto">
          <TabsTrigger
            value="proposals"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 lg:border-b-2  pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Proposals
          </TabsTrigger>
          <TabsTrigger
            value="voters"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 lg:border-b-2  pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Voters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="proposals" className="overflow-auto h-full w-full">
          {proposols && !proposalsPending && proposalsSuccess && proposols.data.length > 0 ? (
            <Table className="mt-3 mb-8">
              <TableCaption className="hidden">A list of recent proposals.</TableCaption>
              <TableHeader>
                <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                  <TableHead className="">Title</TableHead>
                  <TableHead className="text-right">Start</TableHead>
                  <TableHead className="text-right">End</TableHead>
                  <TableHead className="text-right">State</TableHead>
                  <TableHead className="text-right">Votes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer ">
                {proposols.data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="[&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap border-b-0"
                    onClick={() => openLink(`${item.adapter === "snapshot" ? item.externalUrl : `https://boardroom.io/${data?.result.governanceSlug}/proposal/${item.refId}`}`)}
                  >
                    <TableCell className="rounded-l-[4px] w-[180px] max-w-[180px] overflow-ellipsis h-fit overflow-hidden">{item.title}</TableCell>
                    <TableCell className="text-right">{item.startTimestamp !== "0" ? dayjs(Number(item.startTimestamp) * 1000).format("DD MMM,YYYY, HH:mm") : "-"}</TableCell>
                    <TableCell className="text-right text-whitish">
                      {item.endTimestamp !== "0" ? dayjs(Number(item.endTimestamp) * 1000).format("DD MMM,YYYY, HH:mm") : "-"}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        item.currentState === "active"
                          ? "text-purple"
                          : item.currentState === "executed"
                          ? "text-green"
                          : item.currentState === "failed" || item.currentState === "canceled"
                          ? "text-red"
                          : item.currentState === "closed"
                          ? "text-orange-500"
                          : "text-yellow"
                      }`}
                    >
                      {item.currentState}
                    </TableCell>
                    <TableCell className="text-right rounded-r-[4px] w-[200px]">
                      {(item.currentState === "active" || item.currentState === "pending") && item.totalVotes === 0 ? "-" : <NR value={item.totalVotes} short currency={false} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (proposols && proposols.data.length === 0) || proposalsError || !proposolsLoading ? (
            <EmptyCard name="proposals" />
          ) : (
            <div className="flex justify-center content-center h-[80%] items-center">
              <SyncLoader color="#384555" size={20} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="voters" className="overflow-auto h-full w-full">
          {voters && !votersPending && votersSuccess && voters.length > 0 ? (
            <Table className="mt-3 mb-8 ">
              <TableCaption className="hidden">A list of recent voters.</TableCaption>
              <TableHeader>
                <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                  <TableHead className="">Voters Name</TableHead>
                  <TableHead className="text-left">Total Votes Cast</TableHead>
                  <TableHead className="text-left">Last Cast Power</TableHead>
                  <TableHead className="text-left">Active Protocol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(odd)]:bg-foreground ">
                {voters.map((item) => (
                  <TableRow key={item.address} className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap border-b-0">
                    <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">
                      <AddressReducer address={item.address} left={6} right={7} dots={3} />
                    </TableCell>
                    <TableCell className="text-left">{item.protocols[0].totalVotesCast}</TableCell>
                    <TableCell className="text-left text-whitish flex items-center gap-1">
                      <Zap className="w-4 h-4 object-cover text-brand" />
                      <NR value={item.protocols[0].lastCastPower} currency={false} />
                    </TableCell>
                    <TableCell className="text-left rounded-r-[4px] ">{item.protocols.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (voters && !votersPending && votersSuccess && voters.length === 0) || votersError || !votersLoading ? (
            <EmptyCard name="voters" />
          ) : (
            <div className="flex justify-center content-center h-[80%] items-center">
              <SyncLoader color="#384555" size={20} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Governance;
