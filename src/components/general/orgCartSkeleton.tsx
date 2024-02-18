import { Button } from "@components/shadcn/button";
import { Skeleton } from "@components/shadcn/skeleton";
import { MoreHorizontal, Star } from "lucide-react";

function OrgCartSkeleton() {
  return (
    <div className={`w-full h-[130px] sm:h-[140px] md:h-[150px] lg:h-[162px] bg-foreground/25  border rounded-[32px] p-4 after:absolute after:block after:top-0 after:left-0 after:z-10 after:bg-darkBlue/60 after:w-full after:h-full after:rounded-[32px]`}>
      <div className="flex flex-col items-center">
        <Skeleton className="w-[60px] h-[60px] overflow-hidden rounded-full object-cover bg-foreground" />

        <Skeleton className="w-20 h-4 sm:h-5 mt-2 bg-foreground" />

        <Skeleton className="w-12 h-3 sm:h-4 mt-1 bg-foreground" />
      </div>

      <Button variant="ghost" className="absolute top-4 right-4 z-10 cursor-pointer w-5 h-5 p-0 hover:bg-transparent" disabled>
        <Star className={`w-full h-full object-cover hover:text-brand transition-all duration-200 ease-linear`} />
      </Button>

      <Button variant="ghost" className=" p-0 m-0 w-7 h-7 hover:bg-transparent absolute right-3 bottom-2 z-10" disabled>
        <MoreHorizontal className="w-full h-full object-cover cursor-pointer hover:text-brand transition-all duration-200 ease-linear" />
      </Button>
    </div>
  );
}

export default OrgCartSkeleton;
