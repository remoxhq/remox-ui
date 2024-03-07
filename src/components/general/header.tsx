import { NavLink } from "react-router-dom";
import MobileMenu from "@components/core/mobileMenu";
import DesktopMenu from "@components/core/desktopMenu";
import WalletButtons from "@components/core/walletButtons";
import { useAccount } from "wagmi";
import { useUserInfo } from "@/zustand/userInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
import auth from "@/api/auth";
import * as jose from "jose";
import { io } from "socket.io-client";

function Header() {
  const { address } = useAccount();
  const setUser = useUserInfo((state) => ({
    role: state.setRole,
    address: state.setAddress,
  }));
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const token = Cookies.get("JWT");

    if (!token && address) {
      (async () => {
        // console.log("Authing");
        const response = await auth({ address: address! });
        Cookies.set("JWT", response.result, { expires: 7, secure: true, sameSite: "strict" });
        const userRole = jose.decodeJwt(response.result);
        setUser.role(userRole.role as string);
        setUser.address(userRole.publicKey as string);
        queryClient.invalidateQueries();
      })();
    } else if (token && !address) {
      // console.log("Removed Cookie");
      Cookies.remove("JWT");
      setUser.role(undefined);
      setUser.address(undefined);
      queryClient.invalidateQueries();
    } else if (token && address) {
      const oldAddress = jose.decodeJwt(token).publicKey;
      if (oldAddress !== address) {
        (async () => {
          // console.log("Re-Authing");
          const response = await auth({ address: address! });
          Cookies.set("JWT", response.result, { expires: 7, secure: true, sameSite: "strict" });
          const userRole = jose.decodeJwt(response.result);
          setUser.role(userRole.role as string);
          setUser.address(userRole.publicKey as string);
          queryClient.invalidateQueries();
        })();
      } else {
        const userRole = jose.decodeJwt(token);
        setUser.role(userRole.role as string);
        setUser.address(userRole.publicKey as string);
        queryClient.invalidateQueries();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_Socket_API);
    socket.on("annualBalanceFetched", (a) => {
      if(typeof a !== 'undefined'){
        queryClient.invalidateQueries()
       
      }
    });
    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header className="py-2 md:py-3 px-3 md:px-6 fixed top-0 left-0 right-0 h-14 md:h-16 lg:h-[4.5rem] w-screen overflow-hidden z-50 bg-darkBlue border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="max-w-28 md:max-w-32 lg:max-w-36  overflow-hidden mr-0 md:mr-3 lg:mr-4">
              <NavLink to={"/"} title="Remox.IO">
                <img src="/img/logo.png" alt="Remox Logo" className="w-full h-full object-cover" />
              </NavLink>
            </div>
            <DesktopMenu />
          </div>
          <WalletButtons />
          <MobileMenu />
        </div>
      </header>
      <div className="h-14 lg:h-[4.5rem]"></div>
    </>
  );
}

export default Header;
