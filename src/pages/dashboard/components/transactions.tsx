import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/shadcn/tabs";
import EmptyCard from "../../../components/general/emptyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import dayjs from "dayjs";
import TxPagination from "./txPagination";

function Transactions() {
  const openLink = (url: string) => {
    window.open(`${url}`, "_blank");
  };
  
  return (
    <div className="bg-darkBlue rounded-xl p-3 w-full h-[360px] border overflow-hidden">
      <Tabs defaultValue="transactions" className="w-full h-full">
        <TabsList className="w-full bg-transparent gap-10 p-0 h-auto">
          <TabsTrigger
            value="transactions"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="inflow"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Inflow
          </TabsTrigger>
          <TabsTrigger
            value="outflow"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Outflow
          </TabsTrigger>
          <TxPagination className="absolute right-0 top-0 z-10"/>
        </TabsList>
        <TabsContent value="transactions" className="overflow-auto h-full w-full">
          <Table className="mt-3 mb-8">
            <TableCaption className="hidden">A list of recent transactions.</TableCaption>
            <TableHeader>
              <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead >To</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer ">
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-green text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-green text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="inflow" className="overflow-auto h-full w-full">
          <Table className="mt-3 mb-8">
            <TableCaption className="hidden">A list of recent transactions.</TableCaption>
            <TableHeader>
              <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead >To</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer ">
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-green text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-green text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="outflow" className="overflow-auto h-full w-full">
          <EmptyCard name="Outflow" />
          {/* <Table className="mt-3 mb-8">
            <TableCaption className="hidden">A list of recent transactions.</TableCaption>
            <TableHeader>
              <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead >To</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer ">
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-green text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-green text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
              <TableRow
                className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-1 *:text-nowrap "
                onClick={() => openLink("https://blockscan.org")}
              >
                <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                  <Avatar className="w-4 h-4 object-cover rounded-full">
                    <AvatarImage src="/img/chains/eth.png"alt="Organization Logo" className="object-cover" />
                    <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                  <p className="">{dayjs("2017-12-18T13:25:43Z").format("MMM DD")}</p>
                  <span className="text-[8px] leading-[10px]">{dayjs("2017-12-18T13:25:43Z").format("HH:MM")}</span>
                </TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">Treasury vault 2</TableCell>
                <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">0x0C37B714054E9...</TableCell>
                <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                  <div className="flex items-center gap-1">
                    <img src="/img/coin.png" alt="Coin" className="w-4 h-4 object-cover" />
                    <p className="text-red text-sm">15,000</p>
                    <span className="text-sm">USDC</span>
                  </div>   
                </TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Transactions;
