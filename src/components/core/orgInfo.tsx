import Discord from "@assets/icons/discord";
import Github from "@assets/icons/github";
import Twitter from "@assets/icons/twitter";
import Web from "@assets/icons/web";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import { Button } from "@components/shadcn/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";
import { useToast } from "@components/shadcn/use-toast";
import ND from "@utils/numberDecider";
import NR from "@utils/numberReducer";
import { BadgeCheck, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

function OrgInfo() {
  const { toast } = useToast();
  
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
    <section className="flex items-center gap-2">
      <Avatar className="w-[72px] h-[72px]">
        <AvatarImage src="/img/orglogo.png" alt="Organization Logo" className="object-cover" />
        <AvatarFallback className="bg-avatarbg border-2"></AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-1">
          <h1 className="font-medium text-xl text-whitish">Lido</h1>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <BadgeCheck strokeWidth={"3px"} className="w-4 h-4 lg:w-5 lg:h-5 object-cover text-[#2572be] cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="hidden lg:block">
                <p>Verified Organization</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-5">
          <p className="font-semibold text-2xl text-whitish">
            <NR value={62210589981.77} short={false} />
          </p>
          <ND newValue={233} oldValue={23343} className="font-medium text-sm " />
          <div className="py-1 px-5 border-l border-r flex items-center gap-3">
            <Link to="https://remox.io" target="_blank" className="group">
              <Web className="w-4 h-4 object-cover  lg:group-hover:scale-110 transition-all duration-200 ease-in"/>
            </Link>
            <Link to="https://remox.io" target="_blank" className="group">
              <Twitter className="w-4 h-4 object-cover  lg:group-hover:scale-110 transition-all duration-200 ease-in"/>
            </Link>
            <Link to="https://remox.io" target="_blank" className="group">
              <Github className="w-4 h-4 object-cover  lg:group-hover:scale-110 transition-all duration-200 ease-in"/>
            </Link>
            <Link to="https://remox.io" target="_blank" className="group">
              <Discord className="w-4 h-4 object-cover  lg:group-hover:scale-110 transition-all duration-200 ease-in"/>
            </Link>
          </div>
          <Button type="button" className="py-1 px-2 w-auto h-auto border border-brand bg-transparent rounded-[14px] font-semibold text-xs text-brand hover:bg-brand/10" onClick={copyToClipboard}>
            <Share2 className="w-3 h-3 object-cover mr-1 "/> Share
          </Button>
        </div>
      </div>
    </section>
  );
}

export default OrgInfo;
