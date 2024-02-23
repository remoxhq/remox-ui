import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/shadcn/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/shadcn/table";
import { Zap } from "lucide-react";
import NR from "@utils/numberReducer";
import EmptyCard from "@components/general/emptyCard";

function Governance() {
  const openLink = (url: string) => {
    window.open(`${url}`, "_blank");
  };

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
              <TableRow
                className="[&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap "
                onClick={()=>openLink("https://snapshot.org")}
              >
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">Update</TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right text-whitish">-</TableCell>
                <TableCell className="text-right text-purple">active</TableCell>
                <TableCell className="text-right rounded-r-[4px] w-[200px]">461.55M</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap"
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px]  overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-green">EXECUTED</TableCell>
                <TableCell className="text-right rounded-r-[4px]">461.55M</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap" 
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px]  overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-red">failed</TableCell>
                <TableCell className="text-right rounded-r-[4px]">461.55M</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap" 
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px]  overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-red">failed</TableCell>
                <TableCell className="text-right rounded-r-[4px]">461.55M</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap"
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right text-purple">active</TableCell>
                <TableCell className="text-right rounded-r-[4px]">461.55M</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap" 
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px]  overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-red">Canceled</TableCell>
                <TableCell className="text-right rounded-r-[4px]">461.55M</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap"
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-yellow">pending</TableCell>
                <TableCell className="text-right rounded-r-[4px]">-</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap"
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px]  overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-yellow">pending</TableCell>
                <TableCell className="text-right rounded-r-[4px]">-</TableCell>
              </TableRow>
              <TableRow className="hover:bg-none [&>*:not(:nth-child(4))]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap"
              onClick={()=>openLink("https://snapshot.org")}>
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px]  overflow-ellipsis h-fit overflow-hidden">Update subnet </TableCell>
                <TableCell className="text-right">15 Jan, 2024, 07:00</TableCell>
                <TableCell className="text-right">16 Jan, 2024, 12:15</TableCell>
                <TableCell className="text-right text-yellow">pending</TableCell>
                <TableCell className="text-right rounded-r-[4px]">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="voters" className="overflow-auto h-full w-full">
          <EmptyCard name="voters" />
          {/* <Table className="mt-3 mb-8 ">
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
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent [&>*:nth-child(4)]:uppercase *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] w-[200px] max-w-[200px] overflow-ellipsis h-fit overflow-hidden">ermak22232323233</TableCell>
                <TableCell className="text-left">12</TableCell>
                <TableCell className="text-left text-whitish flex items-center gap-1">
                  <Zap className="w-4 h-4 object-cover text-brand"/>
                  <NR value={23233423432} currency={false}/>
                  </TableCell>
                <TableCell className="text-left rounded-r-[4px] ">1</TableCell>
              </TableRow>
              
            </TableBody>
          </Table> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Governance;
