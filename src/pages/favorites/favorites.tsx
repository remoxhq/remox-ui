import SearchBar from "@components/general/searchBar";
import EmptyOrg from "@components/core/emptyOrg";
import { useFetchFavorites } from "@/api/useFetchFavorites";
import { useChainFilter } from "@/zustand/chainFilter";
import { useSearchFilter } from "@/zustand/searchFilter";
import OrgCart from "@components/general/orgCart";
import OrgCartSkeleton from "@components/general/orgCartSkeleton";

function Favorites() {
  const chain = useChainFilter((state) => state.chainFavorites);
  const search = useSearchFilter((state) => state.searchFavorites);

  const { data, isPending, isSuccess } = useFetchFavorites({ chain, search });

  return (
    <>
      <SearchBar title="Favorites" type="fav" />
      <section className={`${!isPending && isSuccess && data.result.items.length === 0 ? "flex items-center justify-center" :"my-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid gap-3 md:gap-4 lg:gap-5 xl:gap-6 min-h-[calc(100vh-280px)] auto-rows-max"}`}>
        {!isPending && isSuccess && data.result.items.length > 0 ? (
          data.result.items.map((item) => (
            <OrgCart
              key={item._id}
              name={item.name}
              balance={item.balance}
              isFav={item.isFavorited}
              isVerify={item.isVerified}
              isActive={item.isActive}
              link={item.dashboardLink}
              image={item.image}
              id={item._id}
              createdBy={item.createdBy}
              item={item}
            />
          ))
        ) : !isPending && isSuccess && data.result.items.length === 0 ? <EmptyOrg name="Favorites" /> : (
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
    </>
  );
}

export default Favorites;
