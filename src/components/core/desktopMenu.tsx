import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@components/shadcn/navigation";
import { NavLink } from "react-router-dom";
import OrgForm from "@components/core/orgForm";
function DesktopMenu() {
  return (
    <>
      <NavigationMenu className="hidden lg:block mr-4 ">
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
      <div className="hidden lg:block">
        <OrgForm />
      </div>
    </>
  );
}

export default DesktopMenu;
