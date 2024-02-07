import { NavLink } from "react-router-dom";
import MobileMenu from "@components/none-core/mobile-menu";
import DesktopMenu from "@components/none-core/desktop-menu";
import WalletButtons from "@components/none-core/wallet-buttons";
function Header() {
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
            <DesktopMenu />
          </div>
          <WalletButtons />
          <MobileMenu />
        </div>
      </header>
      <div className="h-[4.5rem]"></div>
    </>
  );
}

export default Header;
