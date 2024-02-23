import Governance from "@pages/dashboard/components/governance";
import OrgInfo from "@pages/dashboard/components/orgInfo";
import PortfolioHistory from "@pages/dashboard/components/portfolioHistory";
import Transactions from "@pages/dashboard/components/transactions";
import Portfolio from "@pages/dashboard/components/portfolio";

function Dashboard() {
  return (
    <>
      <OrgInfo />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 ">
        <PortfolioHistory />
        <Portfolio/>
        <Transactions/>
        <Governance/>
      </div>
    </>
  );
}

export default Dashboard;
