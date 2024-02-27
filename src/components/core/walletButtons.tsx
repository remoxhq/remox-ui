import { Button } from "@components/shadcn/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/shadcn/tooltip";
import { AddressReducer } from "@utils/addressReducer";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Loader2, LogOut, Wallet } from "lucide-react";
import { useDisconnect, useAccount } from "wagmi";
import Cookies from "js-cookie";
import auth from "@/api/auth";
function WalletButtons() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected, isConnected, isReconnecting } = useAccount();

  console.log("isConnected", isConnected);
  console.log("address", address);
  const login = async () => {
    try {
      await open();
      const token = Cookies.get("JWT");
      if (!token && address) {
        console.log("Girdi");
        const response = await auth({ address: address! });
        Cookies.set("JWT", response.result, { expires: 7, secure: true, sameSite: "strict" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:items-center gap-5 hidden lg:flex">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="connect" size="connect" onClick={login}>
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
  );
}

export default WalletButtons;
