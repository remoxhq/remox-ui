import { useDebounce } from "@/hooks/useDebounce";
import { useSearchFilter } from "@/zustand/searchFilter";
import { Input } from "@components/shadcn/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

type IProps = {
  type: "explore" | "fav" | "my";
};

function SearchInput({ type }: IProps) {
  const searchFilter = useSearchFilter((state) => ({
    setter: {
      explore: state.setSearchExplore,
      fav: state.setSearchFavorites,
      my: state.setSearchCreations,
    },
    getter: {
      explore: state.searchExplore,
      fav: state.searchFavorites,
      my: state.searchCreations,
    },
  }));
  const [value, setValue] = useState("");

  const debouncedRequest = useDebounce(() => {
    searchFilter.setter[type](value)
  });

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    debouncedRequest();
  };

  const onReset = ()=>{
    setValue("")
    searchFilter.setter[type]("")
  }
  return (
    <div className=" sm:w-[200px] md:w-[250px] lg:w-[300px] relative">
      <Search className="absolute z-10 top-[5px] md:top-[10px] left-3 w-5 h-5" />
      {
        value.length > 0 && <X className="absolute z-10 top-[5px] md:top-[10px] right-3 w-5 h-5 cursor-pointer hover:text-whitish transition-all duration-200 ease-in" onClick={onReset}/>
      }
      
      <Input
        className="w-full rounded-[28px] h-8 md:h-10 text-whitish pl-9 text-sm font-medium"
        autoComplete="off"
        type="text"
        placeholder="Search"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default SearchInput;
