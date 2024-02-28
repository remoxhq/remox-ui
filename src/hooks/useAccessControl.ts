import { useMemo } from "react";

type User = {
    role: string | undefined;
    address: string | undefined;
  };
  
  type Access = {
    favAccess: boolean;
    settingAccess: boolean;
  };
const useAccessControl = (user: User, createdBy: string):Access => {
  const isAccessed = useMemo(() => {
    let favAccess = false;
    let settingAccess = false;
    
    if (user.role === "User" && createdBy === user.address) settingAccess = true;
    else if (user.role === "Super Admin") settingAccess = true;

    if (user.address) favAccess = true;
    return { favAccess, settingAccess };
  }, [createdBy, user.address, user.role]);

  return isAccessed;
};

export default useAccessControl;
