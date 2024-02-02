import { Button } from "@components/shared/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationListType,
  navigationMenuTriggerStyle,
} from "@components/shared/navigation-menu";
import { NavLink } from "react-router-dom";
import { PlusCircle, LogOut, Wallet, Loader2, Menu } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shared/tooltip";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { AddressReducer } from "@utils/addressReducer";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "@components/shared/mobile-drawer";
function Navbar() {
  const { open } = useWeb3Modal();
  const { open: ModalOpen } = useWeb3ModalState();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected, isConnected, isReconnecting } = useAccount();

  return (
    <>
      <header className="py-2 md:py-3 px-3 md:px-6 fixed top-0 left-0 right-0 h-14 md:h-16 lg:h-[4.5rem] w-full overflow-hidden z-10 bg-darkBlue border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="max-w-28 md:max-w-32 lg:max-w-36  overflow-hidden mr-0 md:mr-3 lg:mr-4">
              <NavLink to={"/"}>
                <img src="/img/logo.png" alt="Remox Logo" className="w-full h-full object-cover" />
              </NavLink>
            </div>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink to={"/"} className={`${navigationMenuTriggerStyle()}`}>
                    Explore
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to={"/favorites"} className={navigationMenuTriggerStyle()}>
                    Favorites
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to={"/my-creations"} className={navigationMenuTriggerStyle()}>
                    My Creations
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to={"/about"} className={navigationMenuTriggerStyle()}>
                    About
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="cursor-pointer hidden lg:block">
                    <Button variant="create" size="create" disabled={address === undefined && true}>
                      <PlusCircle className="mr-1 h-4 w-4" /> Create
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent sideOffset={12} collisionPadding={5}>
                  {address === undefined ? <p>You don’t have access</p> : <p>Create Organization</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="lg:items-center gap-5 hidden lg:flex">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="connect" size="connect" onClick={() => open()}>
                    {isConnecting || isReconnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                      </>
                    ) : address !== undefined && isConnected ? (
                      <AddressReducer address={address} />
                    ) : (
                      <>
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>
                  {address && isConnected ? (
                    <p>Open Profile</p>
                  ) : (
                    <>
                      <p>Connect Wallet</p>
                    </>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {((!isDisconnected && !isConnecting) || isConnected) && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="logout" size="logout" onClick={() => disconnect()}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={12} collisionPadding={5}>
                    <p>Disconnect</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Sheet {...(ModalOpen ? { open: true } : null)}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="mobileDrawer" size="mobileDrawer">
                <Menu className="h-full w-full" />
              </Button>
            </SheetTrigger>
            <SheetContent className="lg:hidden">
              <SheetHeader>
                <SheetTitle >
                  <div className="max-w-36 mx-auto overflow-hidden ">
                    <NavLink to={"/"}>
                      <img src="/img/logo.png" alt="Remox Logo" className="w-full h-full object-cover" />
                    </NavLink>
                  </div>
                </SheetTitle>
                <SheetDescription asChild>
                  <div className="text-center">
                    <NavigationMenu className="mx-auto">
                      <NavigationMenuList className={`${navigationListType({ type: "mobile" })}`}>
                        <NavigationMenuItem>
                          <NavLink to={"/"} className={`${navigationMenuTriggerStyle({ type: "mobile" })}`}>
                            Explore
                          </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavLink to={"/favorites"} className={`${navigationMenuTriggerStyle({ type: "mobile" })}`}>
                            Favorites
                          </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavLink to={"/my-creations"} className={`${navigationMenuTriggerStyle({ type: "mobile" })}`}>
                            My Creations
                          </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavLink to={"/about"} className={`${navigationMenuTriggerStyle({ type: "mobile" })}`}>
                            About
                          </NavLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <Button variant="create" size="create" disabled={address === undefined && true} className="ml-0">
                      <PlusCircle className="mr-1 h-4 w-4" /> Create
                    </Button>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <Button variant="connect" size="connect" onClick={() => open()}>
                        {(isConnecting || isReconnecting) && ModalOpen ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading
                          </>
                        ) : address !== undefined && isConnected ? (
                          <AddressReducer address={address} />
                        ) : (
                          <>
                            <Wallet className="h-4 w-4 mr-2" />
                            Connect
                          </>
                        )}
                      </Button>

                      {((!isDisconnected && !isConnecting) || isConnected) && (
                        <Button variant="logout" size="logout" className="absolute right-12" onClick={() => disconnect()}>
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="h-[4.5rem]"></div>
    </>
  );
}

export default Navbar;
