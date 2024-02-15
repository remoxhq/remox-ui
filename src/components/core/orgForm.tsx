import { Button } from "@components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@components/shadcn/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PlusCircle } from "lucide-react";
import { useAccount } from "wagmi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";
import MainForm from "./mainForm";
import { useState } from "react";

function OrgForm() {
  const { address } = useAccount();
  const[open,setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="cursor-pointer">
              <DialogTrigger asChild>
                <Button variant="create" size="create" disabled={address === undefined && true}>
                  <PlusCircle className="mr-1 h-4 w-4" /> Create
                </Button>
              </DialogTrigger>
            </span>
          </TooltipTrigger>
          <TooltipContent sideOffset={12} collisionPadding={5} className="hidden lg:block">
            {address === undefined ? <p>You don&apos;t have access</p> : <p>Create Organization</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent
        className="bg-darkBlue px-2 sm:px-4 py-3 sm:py-6 rounded-xl gap-0 max-w-[580px] overflow-y-auto max-h-[95%] "
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <VisuallyHidden asChild>
            <DialogTitle>Hidden</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription asChild></DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <MainForm dialogOpener={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default OrgForm;
