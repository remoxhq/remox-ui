import { Button } from "@components/shadcn/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationListType, navigationMenuTriggerStyle } from "@components/shadcn/navigation"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@components/shadcn/sheet"
import { AddressReducer } from "@utils/addressReducer"
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react"
import { Loader2, LogOut, Menu, Wallet } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useDisconnect, useAccount } from "wagmi"
import OrgForm from "@components/core/org-form";

function MobileMenu() {
  const { open } = useWeb3Modal();
  const { open: ModalOpen } = useWeb3ModalState();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected, isConnected, isReconnecting } = useAccount();
  return (
    <Sheet {...(ModalOpen ? { open: true } : null)}>
    <SheetTrigger asChild className="lg:hidden">
      <Button variant="mobileDrawer" size="mobileDrawer">
        <Menu className="h-full w-full" />
      </Button>
    </SheetTrigger>
    <SheetContent className="lg:hidden">
      <SheetHeader>
        <SheetTitle>
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
              <OrgForm/>
            <div className="flex items-center justify-center mt-4 ">
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
                <Button variant="logout" size="logout" className="absolute right-2 xs:right-5" onClick={() => disconnect()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  )
}

export default MobileMenu