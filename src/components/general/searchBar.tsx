import { chains } from "@/constants";
import { useChainFilter } from "@/zustand/chainFilter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/shadcn/select";
import SearchInput from "./searchInput";

interface IProps {
  title: string;
  type: "explore" | "fav" | "my";
}

function SearchBar({ title, type }: IProps) {
  const chainFilter = useChainFilter((state) => ({
    setter: {
      explore: state.setChainExplore,
      fav: state.setChainFavorites,
      my: state.setChainCreations,
    },
    getter: {
      explore: state.chainExplore,
      fav: state.chainFavorites,
      my: state.chainCreations,
    },
  }));

  return (
    <section className="flex items-center flex-col sm:flex-row sm:justify-between justify-center flex-wrap">
      <h1 className="text-xl md:text-2xl text-whitish leading-tight font-semibold mb-4 sm:mb-0 text-center sm:text-left">{title}</h1>
      <div className="flex items-center justify-center sm:justify-normal gap-3 flex-wrap ">
        <Select defaultValue={chainFilter.getter[type] === "" ? "all" : chainFilter.getter[type]} onValueChange={chainFilter.setter[type]}>
          <SelectTrigger className="text-whitish h-8 md:h-10 font-medium text-sm data-[placeholder]:text-muted-foreground cursor-pointer rounded-[28px] w-36">
            <SelectValue placeholder="Choose Chain" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all" className="cursor-pointer focus:bg-black/20 focus:text-whitish text-whitish font-medium text-sm">
              <div className="flex items-center gap-2">
                <img src="/img/chains/allchains.svg" alt="All Chains" className="w-5 h-5 object-cover overflow-hidden rounded-full" />
                All Chains
              </div>
            </SelectItem>
            {chains.map((chain) => (
              <SelectItem
                key={chain.id}
                value={chain.value}
                className="cursor-pointer focus:bg-black/20 focus:text-whitish text-whitish font-medium text-sm"
              >
                <div className="flex items-center gap-2">
                  <img src={chain.logo} alt={chain.name} className="w-5 h-5 object-cover overflow-hidden rounded-full" />
                  {chain.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SearchInput type={type}/>
      </div>
    </section>
  );
}

export default SearchBar;
