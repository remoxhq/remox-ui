import Governance from "@pages/dashboard/components/governance";
import OrgInfo from "@components/general/orgInfo";
import Portfolio from "@pages/dashboard/components/portfolio";
import Transactions from "@pages/dashboard/components/transactions";

function Dashboard() {
  return (
    <>
      <OrgInfo />
      <div className="mt-8 grid grid-cols-2 gap-8 ">
        <Portfolio />
        <Transactions/>
        <Governance/>
      </div>
    </>
  );
}

export default Dashboard;
