import { ReactNode } from "react";

type IProps = {
    children: ReactNode;
  };
function OrgDashCart({children}:IProps) {
  return (
    <div className="bg-darkBlue rounded-xl p-3 w-[672px] h-[360px]">
        {children}
    </div>
  )
}

export default OrgDashCart