import { useBoardroom } from "@/api/useBoardroom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import { Button } from "@components/shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/shadcn/command";
import { FormControl } from "@components/shadcn/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/shadcn/popover";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./mainForm";

interface IProps {
  type: "nativeToken" | "governance";
  disabled?: boolean;
  value: string;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
}

function SelectWithSearch({ type, disabled = false, value, setValue,  }: IProps) {
  const [open, setOpen] = useState(false);

  const { data, isPending, isSuccess, isError } = useBoardroom();

  const labels = {
    nativeToken: {
      name: disabled ? "Coming Soon" : "Select Native Token",
      search: "Search Native Token",
      empty: "No Native Token Found",
    },
    governance: {
      name: disabled ? "Coming Soon" : "Select Governance",
      search: "Search Governance",
      empty: "No Governance Found",
    },
  };

  const selectedGovernance = data?.data.find((item) => item.cname === value);
  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            role="combobox"
            aria-expanded={open}
            disabled={isPending || isError  ? true : disabled}
            className="w-full justify-between rounded-md hover:bg-background text-whitish font-medium text-sm bg-background border px-3"
          >
            {selectedGovernance && !isPending && isSuccess ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5 object-cover overflow-hidden rounded-full">
                  <AvatarImage
                    className="object-cover"
                    src={"icons" in selectedGovernance ? selectedGovernance.icons[0].url : ""}
                    alt={selectedGovernance.name}
                  />
                  <AvatarFallback className="bg-avatarbg"></AvatarFallback>
                </Avatar>
                {selectedGovernance.name}
              </div>
            ) : (isPending || isError) && !disabled ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : (
              <span className="text-muted-foreground">{labels[type].name}</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-muted-foreground" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-sameAsTriggerWidth p-0 max-h-[300px] overflow-y-auto ">
        <Command>
          <CommandInput placeholder={labels[type].search} className="text-whitish font-medium text-sm" />
          <CommandEmpty className="text-whitish font-medium text-sm p-3">{labels[type].empty}</CommandEmpty>
          <CommandGroup>
            {!isPending &&
              isSuccess &&
              data.data.length > 0 &&
              data.data.map((item) => (
                <CommandItem
                  key={item.cname}
                  value={item.cname}
                  className="cursor-pointer focus:bg-black/20 hover:bg-black/20 hover:text-whitish focus:text-whitish text-whitish font-medium text-sm aria-selected:bg-black/20 aria-selected:text-whitish"
                  onSelect={(currentValue) => {
                    setValue("governanceSlug", currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === item.cname ? "opacity-100" : "opacity-0")} />
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5 object-cover overflow-hidden rounded-full">
                      <AvatarImage className="object-cover" src={"icons" in item ? item.icons[0].url : ""} loading="lazy" alt={item.name} />
                      <AvatarFallback className="bg-avatarbg"></AvatarFallback>
                    </Avatar>
                    {item.name}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelectWithSearch;
