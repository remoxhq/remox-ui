import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/shadcn/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import dayjs from "dayjs";
import NR from "@utils/numberReducer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/shadcn/accordion";
import { useMemo, useState } from "react";
import { Calendar } from "@components/shadcn/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@components/shadcn/popover";
import { Button } from "@components/shadcn/button";
import { Separator } from "@components/shadcn/separator";
import { useFetchSingleOrg } from "@/api/useFetchSingleOrg";
import { useFetchAssets } from "@/api/useFetchAssets";
import { useParams } from "react-router-dom";
import { chainsKeyValue } from "@/constants";
import EmptyCard from "@components/general/emptyCard";
import SyncLoader from "react-spinners/SyncLoader";
import { useFetchPortfolioHistory } from "@/api/useFetchPortfolioHistory";
import { endDate, startDate } from "@utils/startDate";

interface ArchiveResult {
  address: string,
  firstDateData: {
    balanceUsd: number;
    tokenCount: number;
    tokenUsdValue: number;
  },
  secondDateData: {
    balanceUsd: number;
    tokenCount: number;
    tokenUsdValue: number;
  },
  netChange: number,
  assetLogo: string,
  asset: string,
  assetChain: string,
  balanceUsd: {
    amountChange: number,
    percentageChange: number,
  },
  tokenCount: {
    amountChange: number,
    percentageChange: number,
  },
  tokenUsdValue: {
    amountChange: number,
    percentageChange: number,
  },
}

function Portfolio() {
  const { slug } = useParams();
  const { data } = useFetchSingleOrg(slug);
  const { data: assetsData, isPending, isSuccess, isError, isLoading } = useFetchAssets(data?.result.accounts);
  const { data: archiveData, isPending: isArchiveDataPending, isSuccess: isArchiveDataSuccess, isError: isArchiveDataError, isLoading: isArchiveDataLoading } = useFetchPortfolioHistory(slug);

  const [dateOne, setDateOne] = useState<Date | undefined>(startDate());
  const [dateTwo, setDateTwo] = useState<Date | undefined>(endDate());

  const archiveCalculation = useMemo(() => {
    if (!dateOne || !dateTwo) return undefined;

    const firstDateData = archiveData?.result.annual[dayjs(dateOne).format("YYYY-MM-DD")];
    const secondDateData = archiveData?.result.annual[dayjs(dateTwo).format("YYYY-MM-DD")];

    const changes = {} as { [token: string]: ArchiveResult }

    if (firstDateData && secondDateData) {
      Object.keys(firstDateData.tokenBalances).forEach(token => {

        const tokenData1 = firstDateData.tokenBalances[token];
        const tokenData2 = secondDateData.tokenBalances[token];

        if (tokenData1 && tokenData1.balanceUsd && tokenData2 && tokenData2.balanceUsd) {

          changes[token] = {
            firstDateData: tokenData1,
            secondDateData: tokenData2,
            netChange: secondDateData.totalTreasury - firstDateData.totalTreasury,
            assetLogo: archiveData?.result.existingTokens[token].logo ?? "",
            asset: archiveData?.result.existingTokens[token].symbol ?? "",
            assetChain: archiveData?.result.existingTokens[token].chain ?? "",
            address: token,
            balanceUsd: {
              amountChange: 0,
              percentageChange: 0
            },
            tokenCount: {
              amountChange: 0,
              percentageChange: 0
            },
            tokenUsdValue: {
              amountChange: 0,
              percentageChange: 0
            }
          };

          Object.keys(tokenData1).forEach(field => {
            const value1 = tokenData1[field];
            const value2 = tokenData2[field];
            const changeAmount = value2 - value1;
            const changePercent = value1 ? (changeAmount / value1) * 100 : value2;

            changes[token][field] = {
              amountChange: changeAmount,
              percentageChange: changePercent.toFixed(2),
            };
          })
        }
      })
    }

    return {
      firstDayTotalUsdValue: firstDateData?.totalTreasury,
      secondDateTotalUsdValue: secondDateData?.totalTreasury,
      data: Object.values(changes) as ArchiveResult[]
    }
  }, [archiveData, dateOne, dateTwo])

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
          {assetsData && !isPending && isSuccess && assetsData.result.assets.length > 0 ?
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
                {
                  assetsData?.result.assets.map(asset => (
                    <TableRow key={asset.uniqueKey} className="[&>*]:text-whitish *:font-semibold *:text-xs border-transparent *:px-3 *:py-2 *:text-nowrap border-b-0 ">
                      <TableCell className="rounded-l-[4px] overflow-hidden w-[140px]  max-w-[140px] md:w-[180px] md:max-w-[180px] lg:w-[220px] lg:max-w-[220px]">
                        <div className="flex items-center gap-1">
                          <div className="relative">
                            <Avatar className="w-4 h-4 object-cover rounded-full">
                              <AvatarImage src={asset.logo} alt="Organization Logo" className="object-cover" />
                              <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                <img src="/img/defaultToken.png" alt="Default" />
                              </AvatarFallback>
                            </Avatar>

                            <Avatar className="w-[10px] h-[10px] object-cover rounded-full absolute bottom-0 left-2">
                              <AvatarImage src={chainsKeyValue[asset.chain].logo} alt="Chain Logo" className="object-cover" />
                            </Avatar>
                          </div>
                          <p>{asset.symbol}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-left w-[240px] max-w-[240px] lg:w-[160px] lg:max-w-[160px] ">
                        <NR value={asset.quote_rate} currency short={true} />
                      </TableCell>
                      <TableCell className="text-left">
                        <NR value={asset.balance} currency={false} short={true} />
                      </TableCell>
                      <TableCell className="rounded-r-[4px] overflow-ellipsis overflow-hidden text-right">
                        <NR value={asset.quote} currency short={true} />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            : (assetsData && assetsData.result.assets.length === 0) || isError || !isLoading ? (
              <EmptyCard name="Assets" />
            ) : (
              <div className="flex justify-center content-center h-[80%] items-center">
                <SyncLoader color="#384555" size={20} />
              </div>
            )}
        </TabsContent>
        <TabsContent value="holdings" className="overflow-auto h-full w-full ">
          {assetsData && !isPending && isSuccess && assetsData.result.assetsByBlockchain.length > 0 ?
            <div className="mt-3 mb-8 min-w-[350px]">
              <div className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap border-none *:px-3 *:pb-2 flex items-center">
                <p className="w-[220px]">Chain</p>
                <p className="w-[160px]">Price</p>
                <p className="w-[160px]">Top Holdings</p>
                <p className="text-right w-[100px] ml-auto">Assets</p>
              </div>
              <Accordion type="single" collapsible>
                {
                  assetsData?.result.assetsByBlockchain.map(blockchain => (
                    <AccordionItem value="item-1" key={blockchain.blockchain} className="group border-none">
                      <AccordionTrigger className="p-0 group-odd:bg-foreground group-odd:hover:bg-foregroundHover group-even:bg-transparent group-even:hover:bg-transparentHover transition-all duration-200 ease-in rounded-[4px] [&>*]:text-whitish *:font-semibold *:text-xs border-transparent border *:text-nowrap overflow-hidden ">
                        <div className="flex items-center w-full pl-3 py-2 ">
                          <div className="flex items-center gap-1 w-[220px]">
                            <Avatar className="w-4 h-4 object-cover rounded-full">
                              <AvatarImage src={chainsKeyValue[blockchain.blockchain].logo} alt="Organization Logo" className="object-cover" />
                              <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                            </Avatar>
                            <p className="uppercase">{chainsKeyValue[blockchain.blockchain].name}</p>
                          </div>
                          <p className="text-left w-[160px]">
                            <NR value={blockchain.totalAssetUsdValue} short={true} currency />
                          </p>
                          <div className="flex items-center gap-1 w-[160px]">
                            <Avatar className="w-4 h-4 object-cover rounded-full">
                              <AvatarImage src={blockchain.topHoldingUrl} alt="Organization Logo" className="object-cover" />
                              <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                            </Avatar>
                            <p className="uppercase">{blockchain.topHolding}</p>
                          </div>
                          <div className="flex items-center justify-end gap-[2px] ml-auto">
                            {
                              blockchain.top3HoldingsUrls.map((url, index) => (
                                <Avatar key={index} className="w-4 h-4 object-cover rounded-full">
                                  <AvatarImage src={url} alt="Organization Logo" className="object-cover" />
                                  <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                                </Avatar>
                              ))
                            }
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

                        {
                          blockchain.assets.map(asset => (
                            <div key={asset.uniqueKey} className="flex items-center w-full px-3 *:text-[10px] *:font-medium *:text-whitish *:text-nowrap">
                              <div className="flex items-center gap-1 w-[220px]">
                                <div className="relative">
                                  <Avatar className="w-4 h-4 object-cover rounded-full">
                                    <AvatarImage src={asset.logo} alt="Coin Logo" className="object-cover" />
                                    <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                      <img src="/img/defaultToken.png" alt="Default" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <Avatar className="w-[10px] h-[10px] object-cover rounded-full absolute bottom-0 left-2">
                                    <AvatarImage src={chainsKeyValue[asset.chain].logo} alt="Chain Logo" className="object-cover" />
                                  </Avatar>
                                </div>
                                <p className="uppercase">{asset.symbol}</p>
                              </div>
                              <p className="text-left w-[160px]">
                                <NR value={asset.quote_rate} currency short={true} />
                              </p>
                              <div className="flex items-center gap-1 w-[160px]">
                                <NR value={asset.balance} currency short={true} />
                              </div>
                              <div className="ml-auto">
                                <NR value={asset.quote} currency short={true} />
                              </div>
                            </div>
                          ))
                        }

                      </AccordionContent>
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </div>
            : (assetsData && assetsData.result.assetsByBlockchain.length === 0) || isError || !isLoading ? (
              <EmptyCard name="Holding By Blockchain" />
            ) : (
              <div className="flex justify-center content-center h-[80%] items-center">
                <SyncLoader color="#384555" size={20} />
              </div>
            )}
        </TabsContent>
        <TabsContent value="archive" className="overflow-auto h-full scrollbar-none w-full">
          {archiveData && !isArchiveDataPending && isArchiveDataSuccess && archiveData.result.name && archiveCalculation ?
            <div className="mb-8 min-w-[630px]">
              <div className="flex items-center border-b *:pb-2 *:overflow-hidden w-full sticky top-0 pt-2 left-0 bg-darkBlue z-10">
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
                    <NR value={archiveCalculation?.firstDayTotalUsdValue ?? 0} />
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
                          {dateTwo ? dayjs(dateTwo).format("DD/M/YYYY") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateTwo} onSelect={setDateTwo} initialFocus className="text-whitish" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <span className="font-semibold text-xl text-whitish">
                    <NR value={archiveCalculation?.secondDateTotalUsdValue ?? 0} />
                  </span>
                </div>
                <div className="w-[88px] ml-3 ">
                  <div className="flex items-center gap-2  h-[26px] mb-4">
                    <p className="font-semibold text-xs text-whitish">NET CHANGE</p>
                  </div>
                  <span className={`font-semibold text-xl ${(archiveCalculation?.secondDateTotalUsdValue ?? 0) - (archiveCalculation?.firstDayTotalUsdValue ?? 0) > 0 ? 'text-green' : 'text-red'}`}>
                    <NR value={(archiveCalculation?.secondDateTotalUsdValue ?? 0) - (archiveCalculation?.firstDayTotalUsdValue ?? 0)} />
                  </span>
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
              {
                archiveCalculation && archiveCalculation.data.map(item => (
                  <div key={item.address} className="flex items-center justify-center *:overflow-hidden w-full h-12 group">
                    <div className="w-[213.5px] pr-2 ">
                      <div className="flex items-center justify-between group-odd:bg-foreground rounded-[2px] p-1">
                        <div className="flex items-center gap-1">
                          <div className="relative">
                            <Avatar className="w-4 h-4 object-cover rounded-full">
                              <AvatarImage src={item.assetLogo} alt="Organization Logo" className="object-cover" />
                              <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                <img src="/img/defaultToken.png" alt="Default" />
                              </AvatarFallback>
                            </Avatar>
                            <Avatar className="w-[10px] h-[10px] object-cover rounded-full absolute bottom-0 left-2">
                              <AvatarImage src={chainsKeyValue[item.assetChain].logo} alt="Chain Logo" className="object-cover" />
                            </Avatar>
                          </div>
                          <div>
                            <p className="uppercase font-medium text-xs text-whitish mb-1">{item.asset}</p>
                            <p className="uppercase font-medium text-xs text-whitish">
                              <NR value={item.firstDateData.tokenUsdValue} short={true} />
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="uppercase font-medium text-xs text-whitish mb-1">
                            <NR value={item.firstDateData.balanceUsd} short={true} />
                          </p>
                          <p className="uppercase font-medium text-xs text-whitish">
                            <NR value={item.firstDateData.tokenCount} currency={false} />
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="w-[225.5px] px-2">
                      <div className="flex items-center justify-between group-odd:bg-foreground rounded-[2px] p-1">
                        <div className="flex items-center gap-1">
                          <div className="relative">
                            <Avatar className="w-4 h-4 object-cover rounded-full">
                              <AvatarImage src={item.assetLogo} alt="Organization Logo" className="object-cover" />
                              <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                <img src="/img/defaultToken.png" alt="Default" />
                              </AvatarFallback>
                            </Avatar>
                            <Avatar className="w-[10px] h-[10px] object-cover rounded-full absolute bottom-0 left-2">
                              <AvatarImage src={chainsKeyValue[item.assetChain].logo} alt="Chain Logo" className="object-cover" />
                            </Avatar>
                          </div>
                          <div>
                            <p className="uppercase font-medium text-xs text-whitish mb-1">{item.asset}</p>
                            <p className="uppercase font-medium text-xs text-whitish">
                              <NR value={item.secondDateData.tokenUsdValue} short={true} />
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="uppercase font-medium text-xs text-whitish mb-1">
                            <NR value={item.secondDateData.balanceUsd} short={true} />
                          </p>
                          <p className="uppercase font-medium text-xs text-whitish">
                            <NR value={item.secondDateData.tokenCount} currency={false} />
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="w-[calc(100%_-_439.5px)] pl-2 ">
                      <div className="flex items-center justify-between group-odd:bg-foreground rounded-[2px] p-1">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="uppercase font-medium text-xs text-whitish mb-1">
                              {item.tokenUsdValue.amountChange > 0 && "+"}
                              <NR value={item.tokenUsdValue.amountChange} />
                            </p>
                            <p className={`uppercase font-medium text-xs ${item.tokenUsdValue.percentageChange > 0 ? 'text-green' : 'text-red'} `}>{item.tokenUsdValue.percentageChange}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="uppercase font-medium text-xs text-whitish mb-1">
                              {item.balanceUsd.amountChange > 0 && "+"}
                              <NR value={item.balanceUsd.amountChange} />
                            </p>
                            <p className={`uppercase font-medium text-xs ${item.balanceUsd.percentageChange > 0 ? 'text-green' : 'text-red'}`}>{item.balanceUsd.percentageChange}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="uppercase font-medium text-xs text-whitish mb-1">
                              {item.tokenCount.amountChange > 0 && "+"}
                              <NR value={item.tokenCount.amountChange} currency={false} />
                            </p>
                            <p className={`uppercase font-medium text-xs ${item.tokenCount.percentageChange > 0 ? 'text-green' : +item.tokenCount.percentageChange === 0 ? 'text-whitish' : 'text-red'}`}>{item.tokenCount.percentageChange}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            : (archiveData && !archiveData.result.name) || isArchiveDataError || !isArchiveDataLoading ? (
              <EmptyCard name="Assets" />
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

export default Portfolio;
