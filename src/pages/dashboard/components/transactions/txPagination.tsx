import { Button } from "@components/shadcn/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProps {
  className: string;
}

function TxPagination({ className }: IProps) {
  return (
    <div className={className}>
      <div className="flex items-center">
        <p className="p-0 size-5  text-whitish border-y flex items-center justify-center border rounded-l-[2px] cursor-default">1</p>
        <Button variant="ghost" className="p-0 size-5 hover:bg-transparentHover hover:text-brand border-y text-whitish">
          <ChevronLeft className="w-full h-full object-cover" />
        </Button>
        <Button variant="ghost" className="p-0 size-5 hover:bg-transparentHover hover:text-brand border rounded-r-[2px] text-whitish">
          <ChevronRight className="w-full h-full object-cover" />
        </Button>
      </div>
    </div>
  );
}

export default TxPagination;
