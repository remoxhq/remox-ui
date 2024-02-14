import MainForm from "@components/core/mainForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/shadcn/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@components/shadcn/avatar";
import { Button } from "@components/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/shadcn/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/shadcn/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import NT from "@utils/nameTrimmer";
import NR from "@utils/numberReducer";
import { BadgeCheck, MoreHorizontal, Pencil, Star, Trash } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";

interface IProps {
  isFav: boolean;
  name: string;
  image: string;
  link: string;
  balance: number;
  isVerify: boolean;
  isDisabled: boolean;
  isAccessed: boolean;
}

function OrgCart({ name, balance, image, isAccessed, isDisabled, isFav, isVerify, link }: IProps) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [formOpen,setFormOpen] = useState(false)
  return (
    <div
      className={`${
        isDisabled
          ? "after:absolute after:block after:top-0 after:left-0 pointer-events-none after:backdrop-blur-[1px] after:z-50 after:opacity-90 after:bg-darkBlue/70 cursor-not-allowed after:w-full after:h-full after:rounded-[32px]"
          : "bg-background "
      } sm:max-w-[180px] lg:max-w-[190px] xl:max-w-none xl:w-[200px] h-[130px] sm:h-[140px] md:h-[150px] lg:h-[162px] border rounded-[32px] transition-all duration-200 ease-linear p-3 lg:p-4`}
    >
      <Link to={`community/${link}`} target="_blank" className="w-fit block mx-auto group">
        <div className="text-center">
          <Avatar className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] overflow-hidden object-cover mx-auto rounded-full group-hover:scale-110 transition-all duration-200 ease-in ">
            <AvatarImage className="w-full h-full object-cover" src={image} />
            <AvatarFallback className="bg-avatarbg w-full h-full object-cover border-2"></AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center mt-2 mb-[2px] gap-1 w-fit mx-auto">
            <p className="font-semibold md:text-base lg:text-lg xl:text-xl text-whitish">
              <NT name={name} />
            </p>
            {isVerify && (
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
            )}
          </div>
          <span className="text-sm lg:text-base font-semibold text-foreground">
            <NR value={balance} />
          </span>
        </div>
      </Link>
      {!isDisabled && (
        <Button
          variant="ghost"
          className="absolute top-4 right-4 z-10 cursor-pointer w-5 h-5 p-0 hover:bg-transparent"
          disabled={isAccessed ? false : true}
        >
          <Star
            {...(isFav ? { fill: "#FF7348" } : null)}
            className={`${isFav && "text-brand"}  w-full h-full object-cover hover:text-brand transition-all duration-200 ease-linear`}
          />
        </Button>
      )}

      {!isDisabled && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0} className="cursor-pointer absolute right-3 bottom-1 lg:bottom-2 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" p-0 m-0 w-7 h-7 hover:bg-transparent" disabled={isAccessed ? false : true}>
                      <MoreHorizontal className="w-full h-full object-cover cursor-pointer hover:text-brand transition-all duration-200 ease-linear" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    className="bg-foreground text-whitish font-medium rounded-[8px] min-w-[6rem]"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-darkBlue/40 focus:text-whitish w-full h-full"
                      onClick={() => setFormOpen(true)}
                    >
                      <>
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-darkBlue/40 focus:text-whitish w-full h-full"
                      onClick={() => setAlertOpen(true)}
                    >
                      <>
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                      </>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={alertOpen}>
                  <AlertDialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="bg-darkBlue max-w-[380px] py-5 px-4 rounded-[28px] w-[95%]"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle asChild>
                        <>
                          <img src={image} alt="Logo" className="w-[60px] h-[60px] object-cover overflow-hidden rounded-full mx-auto" />
                          <p className="font-medium text-whitish text-lg text-center">{name}</p>
                        </>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="font-medium text-base text-whitish text-center">
                        Are you sure to delete this organization?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mx-auto">
                      <AlertDialogCancel
                        className="bg-transparent font-semibold border-transparent hover:border-border hover:text-whitish py-3 px-8 text-whitish text-base hover:bg-cancelButtonHover rounded-[20px]"
                        onClick={() => setAlertOpen(false)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-removeRed font-semibold border-transparent hover:border-border hover:text-whitish py-3 px-8 text-whitish text-base hover:bg-removeRedHover rounded-[20px]"
                        onClick={() => setAlertOpen(false)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Dialog open={formOpen} onOpenChange={setFormOpen}>
                  <DialogContent
                    className="bg-darkBlue px-2 sm:px-4 py-3 sm:py-6 rounded-xl gap-0 max-w-[580px] overflow-y-auto max-h-[95%] "
                    onInteractOutside={(event) => event.preventDefault()}
                  >
                    <DialogHeader>
                      <VisuallyHidden asChild>
                        <DialogTitle>Hidden</DialogTitle>
                      </VisuallyHidden>
                      <DialogDescription asChild></DialogDescription>
                    </DialogHeader>
                    <MainForm dialogOpener={setFormOpen} />
                  </DialogContent>
                </Dialog>
              </span>
            </TooltipTrigger>
            <TooltipContent className={`hidden ${isAccessed ? "lg:hidden" : "lg:block"}`} sideOffset={8}>
              {isAccessed ? <p>Settings</p> : <p>You don’t have access</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default OrgCart;
