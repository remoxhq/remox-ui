import { useFetchAllOrgs } from "@/api/fetchAllOrgs";
import { useChainFilter } from "@/zustand/chainFilter";
import { useSearchFilter } from "@/zustand/searchFilter";
import OrgCart from "@components/general/orgCart";
import OrgCartSkeleton from "@components/general/orgCartSkeleton";
import SearchBar from "@components/general/searchBar";
import { Button } from "@components/shadcn/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

function Explore() {
  
  const [size, setSize] = useState(24);
  const chain = useChainFilter((state) => state.chainExplore);
  const search = useSearchFilter((state) => state.searchExplore);

  const { data, isPending, isSuccess, isFetching } = useFetchAllOrgs({ size, chain, search });
  
  
 
  return (
    <>
      <SearchBar title="Explore Communities" type="explore" />
      <section className="my-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid gap-3 md:gap-4 lg:gap-5 xl:gap-6 min-h-[calc(100vh-280px)] auto-rows-max">
        {!isPending && isSuccess && data.result.items.length > 0 ? (
          data.result.items.map((item) => (
            <OrgCart
              key={item._id}
              name={item.name}
              balance={Math.random() * 1000}
              isFav={item.isFavorited || false}
              isVerify={item.isVerified}
              isActive={item.isActive}
              link={item.dashboardLink}
              image={item.image}
              id = {item._id}
              createdBy ={item.createdBy}
            />
          ))
        ) : (
          <>
            <OrgCartSkeleton />
            <OrgCartSkeleton />
            <OrgCartSkeleton />
            <OrgCartSkeleton />
            <OrgCartSkeleton />
            <OrgCartSkeleton />
          </>
        )}
      </section>
      <section className="flex justify-center items-center">
        <Button
          className="w-32 h-9 lg:w-36 lg:h-11 text-sm lg:text-base font-medium rounded-[28px] text-whitish bg-brand hover:bg-brand/80 disabled:text-whitish/80 "
          onClick={() => setSize((prev) => prev + 24)}
          disabled={isFetching ? true : data?.result.items.length === data?.result.totalCount ? true : false}
        >
          {isFetching ? (
            <>
              <Loader2 className="mr-1 h-5 w-5 animate-spin" /> Loading
            </>
          ) : data?.result.items.length === data?.result.totalCount ? (
            "No More"
          ) : (
            "Load More"
          )}
        </Button>
      </section>
    </>
  );
}

export default Explore;
