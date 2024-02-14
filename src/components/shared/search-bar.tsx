import { chains } from "@/constants";
import { Input } from "@components/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/shadcn/select";
import { Search } from "lucide-react";

interface IProps{
  title:string
}

function SearchBar({title}:IProps) {
  return (
    <section className="flex items-center flex-col sm:flex-row sm:justify-between justify-center flex-wrap">
      <h1 className="text-xl md:text-2xl text-whitish leading-tight font-semibold mb-4 sm:mb-0 text-center sm:text-left">{title}</h1>
      <div className="flex items-center justify-center sm:justify-normal gap-3 flex-wrap ">
        <Select defaultValue="all">
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

        <div className=" sm:w-[200px] md:w-[250px] lg:w-[300px]">
          <Search className="absolute z-10 top-[5px] md:top-[10px] left-3 w-5 h-5" />
          <Input className="w-full rounded-[28px] h-8 md:h-10 text-whitish pl-9 text-sm font-medium" autoComplete="off" type="text" placeholder="Search" />
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
