import { Button } from "@components/shared/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@components/shared/navigation-menu";
import { NavLink } from "react-router-dom";
import { PlusCircle, LogOut, Wallet, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shared/tooltip";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { AddressReducer } from "@utils/addressReducer";
function Navbar() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <>
      <header className="py-3 px-6 fixed top-0 left-0 right-0 h-[4.5rem] w-full overflow-hidden z-10 bg-darkBlue border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-36 h-auto overflow-hidden mr-4">
              <NavLink to={"/"}>
                <img src="/img/logo.png" alt="Remox Logo" className="w-full h-full object-cover" />
              </NavLink>
            </div>
            <NavigationMenu>
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
                  <span tabIndex={0} className="cursor-pointer">
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
          <div className="flex items-center gap-5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="connect" size="connect" onClick={() => open()}>
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting
                      </>
                    ) : address !== undefined ? (
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
                  {address ? (
                    <p>Open Profile</p>
                  ) : (
                    <>
                      <p>Connect Wallet</p>
                    </>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!isDisconnected && !isConnecting && (
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
        </div>
      </header>
      <div className="h-[4.5rem]"></div>
    </>
  );
}

export default Navbar;
