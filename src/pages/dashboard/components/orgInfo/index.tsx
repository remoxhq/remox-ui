import { useFetchSingleOrg } from "@/api/useFetchSingleOrg";
import Discord from "@assets/icons/discord";
import Github from "@assets/icons/github";
import Twitter from "@assets/icons/twitter";
import Web from "@assets/icons/web";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import { Button } from "@components/shadcn/button";
import { Skeleton } from "@components/shadcn/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";
import { useToast } from "@components/shadcn/use-toast";
import ND from "@utils/numberDecider";
import NR from "@utils/numberReducer";
import { BadgeCheck, Share2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function OrgInfo() {
  const { toast } = useToast();
  const { slug } = useParams();
  const { data, isPending, isSuccess, error } = useFetchSingleOrg(slug);

  console.log(error);
  useEffect(() => {
    if (error && error.isAxiosError && error.response?.status === 403) {
      toast({
        variant: "destructive",
        title: "Access denied!",
        description: "You don't have access to this organization",
        duration: 50000,
      });
    } else if(error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        duration: 50000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Organization URL copied",
        duration: 2000,
        variant: "createOrg",
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: `${error}`,
        duration: 2000,
        variant: "destructive",
      });
    }
  };
  return (
    <section className="flex items-center flex-col md:flex-row gap-2">
      {data && !isPending && isSuccess ? (
        <Avatar className="size-[60px] md:size-16 lg:size-[72px] rounded-full">
          <AvatarImage src={data.result.image} alt="Organization Logo" className="object-cover" />
          <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
        </Avatar>
      ) : (
        <Skeleton className="size-[60px] md:size-16 lg:size-[72px] rounded-full bg-foreground" />
      )}

      <div>
        <div className="flex items-center justify-center md:justify-normal gap-1">
          {data && !isPending && isSuccess ? (
            <>
              <h1 className="font-medium text-xl text-whitish">{data.result.name}</h1>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} className={`${!data.result.isVerified && "hidden"}`}>
                      <BadgeCheck strokeWidth={"3px"} className="w-4 h-4 lg:w-5 lg:h-5 object-cover text-[#2572be] cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="hidden lg:block">
                    <p>Verified Organization</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
            </>
          ) : (
            <Skeleton className="w-[200px] h-[18px] bg-foreground rounded-full" />
          )}
        </div>
        {data && !isPending && isSuccess ? (
          <div className="flex items-center gap-2 md:gap-5  md:flex-row flex-col">
            <div className="flex items-center gap-2 md:gap-5">
              <p className="font-semibold text-lg sm:text-xl md:text-2xl text-whitish">
                <NR value={data.result.balance} short={false} />
              </p>
              <ND newValue={data.result.balance} oldValue={data.result.lastDayBalance} className="font-medium text-sm " />
            </div>
            <div className="py-1 px-5 border-l border-r flex items-center gap-3">
              <Link to={data.result.website} target="_blank" title="Website" className="group">
                <Web className="w-4 h-4 object-cover lg:group-hover:scale-110 transition-all duration-200 ease-in" />
              </Link>
              <Link to={data.result.twitter} title="Twitter" target="_blank" className="group">
                <Twitter className="w-4 h-4 object-cover  lg:group-hover:scale-110 transition-all duration-200 ease-in" />
              </Link>
              <Link to={data.result.github} title="Github" target="_blank" className="group">
                <Github className="w-4 h-4 object-cover  lg:group-hover:scale-110 transition-all duration-200 ease-in" />
              </Link>
              <Link to={data.result.discord} title="Discord" target="_blank" className="group">
                <Discord className="w-4 h-4 object-cover lg:group-hover:scale-110 transition-all duration-200 ease-in" />
              </Link>
            </div>
            <Button
              type="button"
              className="py-1 px-2 w-auto h-auto border border-brand bg-transparent rounded-[14px] font-semibold text-xs text-brand hover:bg-brand/10"
              onClick={copyToClipboard}
            >
              <Share2 className="w-3 h-3 object-cover mr-1 " /> Share
            </Button>
          </div>
        ) : (
          <Skeleton className="w-[280px] h-[22px] bg-foreground rounded-full mt-2" />
        )}
      </div>
    </section>
  );
}

export default OrgInfo;
