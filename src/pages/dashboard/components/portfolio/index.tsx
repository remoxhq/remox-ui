import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/shadcn/tabs";
// import EmptyCard from "@components/general/emptyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import dayjs from "dayjs";
import NR from "@utils/numberReducer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/shadcn/accordion";
import { useState } from "react";
import { Calendar } from "@components/shadcn/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@components/shadcn/popover";
import { Button } from "@components/shadcn/button";
import ND from "@utils/numberDecider";
import { Separator } from "@components/shadcn/separator";

function Portfolio() {
  const [dateOne, setDateOne] = useState<Date | undefined>();
  const [dateTwo, setDateTwo] = useState<Date | undefined>();
  return (
    <div className="bg-darkBlue rounded-xl p-3 w-full h-[360px] border overflow-hidden">
      <Tabs defaultValue="portfolio" className="w-full h-full">
        <TabsList className="bg-transparent gap-5 xss:gap-10 p-0 h-auto w-full overflow-auto *:min-w-fit xxs:justify-center justify-normal">
          <TabsTrigger
            value="portfolio"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 lg:border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="holdings"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0  lg:border-b-2  pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Holdings by Chain
          </TabsTrigger>
          <TabsTrigger
            value="archive"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0  lg:border-b-2  pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Portfolio Archive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio" className="w-full h-full">
          <Table className="mt-3 mb-8 ">
            <TableCaption className="hidden">A list of recent portfolio.</TableCaption>
            <TableHeader>
              <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                <TableHead>Asset</TableHead>
                <TableHead className="text-left">Price</TableHead>
                <TableHead className="text-left">Holdings</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>*:nth-child(odd)]:bg-foreground ">
              <TableRow className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-2 *:text-nowrap">
                <TableCell className="rounded-l-[4px] overflow-hidden w-[140px] max-w-[140px] md:w-[180px] md:max-w-[180px] lg:w-[220px] lg:max-w-[220px]">
                  <div className="flex items-center gap-1">
                    <Avatar className="w-4 h-4 object-cover rounded-full">
                      <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                      <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                    </Avatar>
                    <p>USDC</p>
                  </div>
                </TableCell>
                <TableCell className="text-left w-[240px] max-w-[240px] lg:w-[160px] lg:max-w-[160px] ">
                  <NR value={1} currency short={false} />
                </TableCell>
                <TableCell className="text-left">42</TableCell>
                <TableCell className="rounded-r-[4px] overflow-ellipsis overflow-hidden text-right">
                  <NR value={42} currency short={false} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="holdings" className="overflow-auto h-full w-full ">
          <div className="mt-3 mb-8 min-w-[350px]">
            <div className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap border-none *:px-3 *:pb-2 flex items-center">
              <p className="w-[220px]">Chain</p>
              <p className="w-[160px]">Price</p>
              <p className="w-[160px]">Top Holdings</p>
              <p className="text-right w-[100px] ml-auto">Assets</p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9" className="group border-none">
                <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                  <div className="flex items-center w-full pl-3 py-2 ">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/chains/eth.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">Ethereum</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <div className="flex items-center justify-end gap-[2px] ml-auto">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 pb-1">
                  <div className="*:text-xs *:text-whitish *:text-nowrap border-none *:px-3 *:pb-1 flex items-center ">
                    <p className="w-[220px]">Asset</p>
                    <p className="w-[160px]">Price</p>
                    <p className="w-[160px]">Holdings</p>
                    <p className="text-right w-[100px] ml-auto">Value</p>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                  <div className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                    <div className="flex items-center gap-1 w-[220px]">
                      <Avatar className="w-4 h-4 object-cover rounded-full">
                        <AvatarImage src="/img/coin.png" alt="Coin Logo" className="object-cover" />
                        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                      </Avatar>
                      <p className="uppercase">USDC</p>
                    </div>
                    <p className="text-left w-[160px]">
                      <NR value={1223223} currency short={false} />
                    </p>
                    <div className="flex items-center gap-1 w-[160px]">42</div>
                    <div className="ml-auto">
                      <NR value={1223} currency short={false} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="archive" className="overflow-auto h-full scrollbar-none w-full">
          <div className="mb-8 min-w-[630px]">
            <div className="flex items-center border-b *:pb-2 *:overflow-hidden w-full sticky top-2 mb-2 left-0 bg-darkBlue z-10">
              <div className="w-[214px] pr-3 border-r ">
                <div className="flex items-center gap-2 h-[26px] mb-4">
                  <p className="font-semibold text-xs text-whitish">HOLDINGS ON</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="rounded-[8px] bg-foreground text-whitish text-xs font-semibold p-0 h-auto py-1 px-1 w-[110px]"
                      >
                        <CalendarIcon className="mr-1 size-4" />
                        {dateOne ? dayjs(dateOne).format("DD/M/YYYY") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateOne} onSelect={setDateOne} initialFocus className="text-whitish" />
                    </PopoverContent>
                  </Popover>
                </div>
                <span className="font-semibold text-xl text-whitish">
                  <NR value={234342423} />
                </span>
              </div>
              <div className="w-[226px] px-3 border-r ">
                <div className="flex items-center gap-2  h-[26px] mb-4">
                  <p className="font-semibold text-xs text-whitish">HOLDINGS ON</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="rounded-[8px] bg-foreground text-whitish text-xs font-semibold p-0 h-auto py-1 px-1 w-[110px]"
                      >
                        <CalendarIcon className="mr-1 size-4" />
                        {dateTwo ? dayjs(dateTwo).format("DD/M/YYYY"): <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTwo} onSelect={setDateTwo} initialFocus className="text-whitish" />
                    </PopoverContent>
                  </Popover>
                </div>
                <span className="font-semibold text-xl text-whitish">
                  <NR value={234342423} />
                </span>
              </div>
              <div className="w-[78px] ml-3 ">
                <div className="flex items-center gap-2  h-[26px] mb-4">
                  <p className="font-semibold text-xs text-whitish">NET CHANGE</p>
                </div>
                <ND newValue={2323232} oldValue={223233} short className="font-semibold text-xl" />
              </div>
            </div>
            <div className="flex items-center *:overflow-hidden w-full *:py-2 ">
              <div className="w-[214px] pr-3 border-r">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-xs text-whitish">Asset</p>
                  <p className="font-semibold text-xs text-whitish">Holdings</p>
                </div>
              </div>
              <div className="w-[226px] px-3 border-r">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-xs text-whitish">Asset</p>
                  <p className="font-semibold text-xs text-whitish">Holdings</p>
                </div>
              </div>
              <div className="w-[calc(100%_-_440px)] pl-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-xs text-whitish">Asset</p>
                  <p className="font-semibold text-xs text-whitish">USD</p>
                  <p className="font-semibold text-xs text-whitish">Holdings</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center *:overflow-hidden w-full h-12 group">
              <div className="w-[213.5px] pr-2 ">
                <div className="flex items-center justify-between group-odd:bg-foreground rounded-[2px] p-1">
                  <div className="flex items-center gap-1">
                    <Avatar className="w-4 h-4 object-cover rounded-full">
                      <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                      <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="uppercase font-medium text-xs text-whitish mb-1">BTC</p>
                      <p className="uppercase font-medium text-xs text-whitish">
                        <NR value={2232323} short={false} />
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="uppercase font-medium text-xs text-whitish mb-1">
                      <NR value={2232323} />
                    </p>
                    <p className="uppercase font-medium text-xs text-whitish">
                      <NR value={22323} currency={false} />
                    </p>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical"/>
              <div className="w-[225.5px] px-2">
                <div className="flex items-center justify-between group-odd:bg-foreground rounded-[2px] p-1">
                  <div className="flex items-center gap-1">
                    <Avatar className="w-4 h-4 object-cover rounded-full">
                      <AvatarImage src="/img/coin.png" alt="Organization Logo" className="object-cover" />
                      <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="uppercase font-medium text-xs text-whitish mb-1">BTC</p>
                      <p className="uppercase font-medium text-xs text-whitish">
                        <NR value={2232323} short={false} />
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="uppercase font-medium text-xs text-whitish mb-1">
                      <NR value={2232323} />
                    </p>
                    <p className="uppercase font-medium text-xs text-whitish">
                      <NR value={22323} currency={false} />
                    </p>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical"/>
              <div className="w-[calc(100%_-_439.5px)] pl-2 ">
                <div className="flex items-center justify-between group-odd:bg-foreground rounded-[2px] p-1">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="uppercase font-medium text-xs text-whitish mb-1">
                        {"+"}
                        <NR value={12348932} />
                      </p>
                      <p className="uppercase font-medium text-xs text-green">73.01%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="uppercase font-medium text-xs text-whitish mb-1">
                        {"+"}
                        <NR value={12348932} />
                      </p>
                      <p className="uppercase font-medium text-xs text-green">73.01%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="uppercase font-medium text-xs text-whitish mb-1">
                        {"+"}
                        <NR value={12348932} />
                      </p>
                      <p className="uppercase font-medium text-xs text-green">73.01%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Portfolio;
