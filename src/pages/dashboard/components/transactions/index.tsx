import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/shadcn/tabs";
import EmptyCard from "@components/general/emptyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useFetchSingleOrg } from "@/api/useFetchSingleOrg";
import { useFetchTransactions } from "@/api/useFetchTransactions";
import SyncLoader from "react-spinners/SyncLoader";
import { AddressReducer } from "@utils/addressReducer";
import NR from "@utils/numberReducer";
import { chainsObj, scans } from "@/constants";

import { InView } from "react-intersection-observer";

function Transactions() {
  const openLink = (url: string) => {
    window.open(`${url}`, "_blank");
  };
  const { slug } = useParams();
  const { data } = useFetchSingleOrg(slug);

  const { data: txs, isPending, isSuccess, isError, isLoading, fetchNextPage, hasNextPage } = useFetchTransactions(data?.result.dashboardLink);

  
  return (
    <div className="bg-darkBlue rounded-xl p-3 w-full h-[360px] border overflow-hidden">
      <Tabs defaultValue="transactions" className="w-full h-full">
        <TabsList className="bg-transparent gap-5 xss:gap-10 p-0 h-auto w-full overflow-auto *:min-w-fit mx-auto relative ">
          <TabsTrigger
            value="transactions"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 lg:border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="inflow"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 lg:border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Inflow
          </TabsTrigger>
          <TabsTrigger
            value="outflow"
            className="font-medium text-sm text-whitish hover:text-brand duration-200 ease-in data-[state=active]:bg-transparent data-[state=active]:text-brand p-0 m-0 lg:border-b-2 pb-1 rounded-none border-transparent data-[state=active]:border-brand"
          >
            Outflow
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="overflow-auto h-full w-full">
          {txs && !isPending && isSuccess ? (
            <Table className="mt-3 mb-8">
              <TableCaption className="hidden">A list of recent transactions.</TableCaption>
              <TableHeader>
                <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer">
                {txs.pages.map((page, index) =>
                  page?.result.txs.map((item, i) => {
                    const fromNameFinder = data?.result.accounts.find(account => account.address.toLowerCase() === item.from)
                    const fromName = fromNameFinder ? fromNameFinder.name : <AddressReducer address={item.from} dots={3} left={6} right={12} />
                    const toNameFinder = data?.result.accounts.find(account => account.address.toLowerCase() === item.to)
                    const toName = toNameFinder ? toNameFinder.name : <AddressReducer address={item.to} dots={3} left={6} right={12} />
                    if (index === txs.pages.length - 1 && i === page.result.txs.length - 1) {
                      return (
                        <>
                          <InView
                            key={item.id}
                            as="tr"
                            onChange={(inView) => {
                              if (inView && hasNextPage) {
                                fetchNextPage();
                              }
                            }}
                            className="[&>*]:text-whitish *:font-semibold *:text-xs border-b-0 *:px-3 *:py-1 *:text-nowrap"
                            onClick={() => openLink(`${scans[item.chain]}${item.hash}`)}
                          >
                            <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                              <Avatar className="w-4 h-4 object-cover rounded-full">
                                <AvatarImage src={chainsObj[item.chain]} alt="Chain Logo" className="object-cover" />
                                <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                              <p className="text-xs">{dayjs(item.date).format("MMM DD")}</p>
                              <span className="text-[8px] leading-[10px]">{dayjs(item.date).format("HH:MM")}</span>
                            </TableCell>
                            <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                              
                              {fromName}
                            </TableCell>
                            <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                              {toName}
                            </TableCell>
                            <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                              <div className="flex items-center ">
                                <Avatar className="w-4 h-4 object-cover rounded-full mr-1">
                                  <AvatarImage src={item.assetLogo} alt="Token Logo" className="object-cover" />
                                  <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                    <img src="/img/defaultToken.png" alt="Default" />
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-sm overflow-ellipsis h-fit overflow-hidden text-nowrap">
                                  <span className={`${item.direction === "In" ? "text-green" :"text-red"}`}>
                                    <NR value={item.amount} short currency={false} />
                                  </span>
                                  <span className="pl-[6px] text-whitish">{item.assetName && item.assetName.substring(0, 10)}</span>
                                </p>
                              </div>
                            </TableCell>
                          </InView>
                        </>
                      );
                    } else {
                      return (
                        <TableRow
                          key={item.id}
                          className="[&>*]:text-whitish *:font-semibold *:text-xs border-b-0 *:px-3 *:py-1 *:text-nowrap"
                          onClick={() => openLink(`${scans[item.chain]}${item.hash}`)}
                        >
                          <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                            <Avatar className="w-4 h-4 object-cover rounded-full">
                              <AvatarImage src={chainsObj[item.chain]} alt="Chain Logo" className="object-cover" />
                              <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                            <p className="text-xs">{dayjs(item.date).format("MMM DD")}</p>
                            <span className="text-[8px] leading-[10px]">{dayjs(item.date).format("HH:MM")}</span>
                          </TableCell>
                          <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                            {fromName}
                          </TableCell>
                          <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                            {toName }
                          </TableCell>
                          <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px]  h-fit overflow-hidden">
                            <div className="flex items-center ">
                              <Avatar className="w-4 h-4 object-cover rounded-full mr-1">
                                <AvatarImage src={item.assetLogo} alt="Token Logo" className="object-cover" />
                                <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                  <img src="/img/defaultToken.png" alt="Default" />
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-sm overflow-ellipsis h-fit overflow-hidden text-nowrap">
                                <span className={`${item.direction === "In" ? "text-green" :"text-red"}`}>
                                  <NR value={item.amount} short currency={false} />
                                </span>
                                <span className="pl-[6px] text-whitish">{item.assetName && item.assetName.substring(0, 10)}</span>
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })
                )}
              </TableBody>
            </Table>
          ) : (txs && txs.pages.length === 0) || isError || !isLoading ? (
            <EmptyCard name="transactions" />
          ) : (
            <div className="flex justify-center content-center h-[80%] items-center">
              <SyncLoader color="#384555" size={20} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="inflow" className="overflow-auto h-full w-full ">
          {txs && !isPending && isSuccess ? (
            <Table className="mt-3 mb-8">
              <TableCaption className="hidden">A list of recent transactions.</TableCaption>
              <TableHeader>
                <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer">
                {txs.pages.map((page, index) =>
                  page?.result.txs
                    .filter((x) => x.direction === "In")
                    .map((item, i) => {
                      const fromNameFinder = data?.result.accounts.find(account => account.address.toLowerCase() === item.from)
                    const fromName = fromNameFinder ? fromNameFinder.name : <AddressReducer address={item.from} dots={3} left={6} right={12} />
                    const toNameFinder = data?.result.accounts.find(account => account.address.toLowerCase() === item.to)
                    const toName = toNameFinder ? toNameFinder.name : <AddressReducer address={item.to} dots={3} left={6} right={12} />
                      if (index === txs.pages.length - 1 && i === page.result.txs.length - 1) {
                        return (
                          <>
                            <InView
                              key={item.id}
                              as="tr"
                              onChange={(inView) => {
                                if (inView && hasNextPage) {
                                  fetchNextPage();
                                }
                              }}
                              className="[&>*]:text-whitish *:font-semibold *:text-xs border-b-0 *:px-3 *:py-1 *:text-nowrap"
                              onClick={() => openLink(`${scans[item.chain]}${item.hash}`)}
                            >
                              <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                                <Avatar className="w-4 h-4 object-cover rounded-full">
                                  <AvatarImage src={chainsObj[item.chain]} alt="Chain Logo" className="object-cover" />
                                  <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                                <p className="text-xs">{dayjs(item.date).format("MMM DD")}</p>
                                <span className="text-[8px] leading-[10px]">{dayjs(item.date).format("HH:MM")}</span>
                              </TableCell>
                              <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                                {fromName}
                              </TableCell>
                              <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                                {toName}
                              </TableCell>
                              <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                                <div className="flex items-center ">
                                  <Avatar className="w-4 h-4 object-cover rounded-full mr-1">
                                    <AvatarImage src={item.assetLogo} alt="Token Logo" className="object-cover" />
                                    <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                      <img src="/img/defaultToken.png" alt="Default" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm overflow-ellipsis h-fit overflow-hidden text-nowrap">
                                    <span className="text-green ">
                                      <NR value={item.amount} short currency={false} />
                                    </span>
                                    <span className="pl-[6px] text-whitish">{item.assetName && item.assetName.substring(0, 10)}</span>
                                  </p>
                                </div>
                              </TableCell>
                            </InView>
                          </>
                        );
                      } else {
                        return (
                          <TableRow
                            key={item.id}
                            className="[&>*]:text-whitish *:font-semibold *:text-xs border-b-0 *:px-3 *:py-1 *:text-nowrap"
                            onClick={() => openLink(`${scans[item.chain]}${item.hash}`)}
                          >
                            <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                              <Avatar className="w-4 h-4 object-cover rounded-full">
                                <AvatarImage src={chainsObj[item.chain]} alt="Chain Logo" className="object-cover" />
                                <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                              <p className="text-xs">{dayjs(item.date).format("MMM DD")}</p>
                              <span className="text-[8px] leading-[10px]">{dayjs(item.date).format("HH:MM")}</span>
                            </TableCell>
                            <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                              {fromName}
                            </TableCell>
                            <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                              {toName}
                            </TableCell>
                            <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                              <div className="flex items-center ">
                                <Avatar className="w-4 h-4 object-cover rounded-full mr-1">
                                  <AvatarImage src={item.assetLogo} alt="Token Logo" className="object-cover" />
                                  <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                    <img src="/img/defaultToken.png" alt="Default" />
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-sm overflow-ellipsis h-fit overflow-hidden text-nowrap">
                                  <span className="text-green ">
                                    <NR value={item.amount} short currency={false} />
                                  </span>
                                  <span className="pl-[6px] text-whitish">{item.assetName && item.assetName.substring(0, 10)}</span>
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })
                )}
              </TableBody>
            </Table>
          ) : (txs && txs.pages.length === 0) || isError || !isLoading ? (
            <EmptyCard name="transactions" />
          ) : (
            <div className="flex justify-center content-center h-[80%] items-center">
              <SyncLoader color="#384555" size={20} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="outflow" className="overflow-auto h-full w-full ">
          {txs && !isPending && isSuccess ? (
            <Table className="mt-3 mb-8">
              <TableCaption className="hidden">A list of recent transactions.</TableCaption>
              <TableHeader>
                <TableRow className="*:text-xs *:font-semibold *:text-whitish *:text-nowrap hover:bg-transparent border-none *:h-auto *:px-3 *:pb-2">
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&>*:nth-child(odd)]:bg-foreground [&>*:nth-child(odd):hover]:bg-foregroundHover [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*:nth-child(even):hover]:bg-transparentHover [&>*]:cursor-pointer ">
                {txs.pages.map((page, index) =>
                  page?.result.txs
                    .filter((x) => x.direction === "Out")
                    .map((item, i) => {
                      const fromNameFinder = data?.result.accounts.find(account => account.address.toLowerCase() === item.from)
                    const fromName = fromNameFinder ? fromNameFinder.name : <AddressReducer address={item.from} dots={3} left={6} right={12} />
                    const toNameFinder = data?.result.accounts.find(account => account.address.toLowerCase() === item.to)
                    const toName = toNameFinder ? toNameFinder.name : <AddressReducer address={item.to} dots={3} left={6} right={12} />
                      if (index === txs.pages.length - 1 && i === page.result.txs.length - 1) {
                        return (
                          <>
                            <InView
                              key={item.id}
                              as="tr"
                              onChange={(inView) => {
                                if (inView && hasNextPage) {
                                  fetchNextPage();
                                }
                              }}
                              className="[&>*]:text-whitish *:font-semibold *:text-xs border-b-0 *:px-3 *:py-1 *:text-nowrap"
                              onClick={() => openLink(`${scans[item.chain]}${item.hash}`)}
                            >
                              <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                                <Avatar className="w-4 h-4 object-cover rounded-full">
                                  <AvatarImage src={chainsObj[item.chain]} alt="Chain Logo" className="object-cover" />
                                  <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                                <p className="text-xs">{dayjs(item.date).format("MMM DD")}</p>
                                <span className="text-[8px] leading-[10px]">{dayjs(item.date).format("HH:MM")}</span>
                              </TableCell>
                              <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                                {fromName}
                              </TableCell>
                              <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                                {toName}
                              </TableCell>
                              <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                                <div className="flex items-center ">
                                  <Avatar className="w-4 h-4 object-cover rounded-full mr-1">
                                    <AvatarImage src={item.assetLogo} alt="Token Logo" className="object-cover" />
                                    <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                      <img src="/img/defaultToken.png" alt="Default" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm overflow-ellipsis h-fit overflow-hidden text-nowrap">
                                    <span className="text-red">
                                      <NR value={item.amount} short currency={false} />
                                    </span>
                                    <span className="pl-[6px] text-whitish">{item.assetName && item.assetName.substring(0, 10)}</span>
                                  </p>
                                </div>
                              </TableCell>
                            </InView>
                          </>
                        );
                      } else {
                        return (
                          <TableRow
                            key={item.id}
                            className="[&>*]:text-whitish *:font-semibold *:text-xs border-b-0 *:px-3 *:py-1 *:text-nowrap"
                            onClick={() => openLink(`${scans[item.chain]}${item.hash}`)}
                          >
                            <TableCell className="rounded-l-[4px] w-[30px] max-w-[30px] overflow-hidden">
                              <Avatar className="w-4 h-4 object-cover rounded-full">
                                <AvatarImage src={chainsObj[item.chain]} alt="Chain Logo" className="object-cover" />
                                <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="flex flex-col justify-center w-[70px] max-w-[70px]">
                              <p className="text-xs">{dayjs(item.date).format("MMM DD")}</p>
                              <span className="text-[8px] leading-[10px]">{dayjs(item.date).format("HH:MM")}</span>
                            </TableCell>
                            <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                              {fromName}
                            </TableCell>
                            <TableCell className="w-[190px] max-w-[190px] overflow-ellipsis h-fit overflow-hidden">
                              {toName}
                            </TableCell>
                            <TableCell className="rounded-r-[4px] w-[150px] max-w-[150px] overflow-ellipsis h-fit overflow-hidden">
                              <div className="flex items-center ">
                                <Avatar className="w-4 h-4 object-cover rounded-full mr-1">
                                  <AvatarImage src={item.assetLogo} alt="Token Logo" className="object-cover" />
                                  <AvatarFallback className="bg-avatarbg text-[6px] uppercase" asChild>
                                    <img src="/img/defaultToken.png" alt="Default" />
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-sm overflow-ellipsis h-fit overflow-hidden text-nowrap">
                                  <span className="text-red">
                                    <NR value={item.amount} short currency={false} />
                                  </span>
                                  <span className="pl-[6px] text-whitish">{item.assetName && item.assetName.substring(0, 10)}</span>
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })
                )}
              </TableBody>
            </Table>
          ) : (txs && txs.pages.length === 0) || isError || !isLoading ? (
            <EmptyCard name="transactions" />
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

export default Transactions;
