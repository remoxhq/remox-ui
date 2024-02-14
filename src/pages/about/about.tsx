import SocialDiscord from "@assets/icons/socialDiscord";
import SocialMedium from "@assets/icons/socialMedium";
import SocialTwitter from "@assets/icons/socialTwitter";
import { Link } from "react-router-dom";

function About() {
  const year = new Date().getFullYear()
  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-20 pt-4 sm:pt-6 md:pt-9 lg:pt-12">
        <p className="text-[24px] md:text-[28px] lg:text-[32px] text-whitish font-semibold leading-tight mb-5 max-w-[600px] mx-auto">
          Treasury and Governance Solutions for <span className="text-brand">Onchain</span> Communities
        </p>
        <span className="font-semibold text-sm md:text-base text-foreground block max-w-[635px] mx-auto">
          We help onchain communities manage their finances and governance in one place, ensuring that they are operating in a transparent and
          accountable manner.
        </span>
      </div>
      <article>
        <p className="font-semibold text-[22px] sm:text-[24px] md:text-[28px] text-whitish py-4 md:py-5 w-fit gradientBorder mx-auto sm:mx-0">Features</p>
        <div className="flex items-center justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-4">
          <div className="w-[380px] lg:w-[410px]  sm:h-[240px] lg:h-[280px] rounded-[20px] border bg-darkBlue bg-featuresCardBG bg-no-repeat bg-top bg-[length:100%_60%] text-center py-5 md:py-9 px-2">
            <div>
              <img src="/img/financial.svg" alt="Financial Insights" className="w-11 h-11 object-cover overflow-hidden mx-auto mb-3" />
              <span className="font-semibold text-xl md:text-2xl text-whitish ">Financial Insights</span>
              <p className="font-semibold text-sm md:text-base leading-tight mt-5 sm:mt-6 md:mt-11 max-w-[313px] mx-auto">
                Get a detailed view of the organization&apos;s digital holdings, portfolio history, and token flow movements in one place.
              </p>
            </div>
          </div>
          <div className="w-[380px] lg:w-[410px] sm:h-[240px] lg:h-[280px] rounded-[20px] border bg-darkBlue bg-featuresCardBG bg-no-repeat bg-top bg-[length:100%_60%] text-center py-5 md:py-9  px-2 ">
            <div>
              <img src="/img/community.svg" alt="Community Activity" className="w-11 h-11 object-cover overflow-hidden mx-auto mb-3" />
              <span className="font-semibold text-xl md:text-2xl text-whitish ">Community Activity</span>
              <p className="font-semibold text-sm md:text-base leading-tight mt-5 sm:mt-6  md:mt-11  max-w-[370px] mx-auto">
                Monitor community proposals and top voter data to gain insights into the financial decisions made for your organization&apos;s
                treasury.
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="my-12 sm:my-16 md:my-20">
        <p className="font-semibold text-[22px] sm:text-[24px] md:text-[28px] text-whitish py-4 md:py-5 w-fit gradientBorder mx-auto sm:mx-0">Investors</p>

        <div className="w-full md:h-[312px] rounded-[20px] border bg-darkBlue bg-investorsCardBG bg-no-repeat bg-center bg-[length:100%_90%] text-center py-5 sm:py-7 md:py-9 flex flex-col justify-between px-4">
          <div className="flex items-center gap-x-14 gap-y-4 md:gap-32 justify-center flex-wrap">
            <img src="/img/investors/orangedao.png" alt="Orange DAO" className="max-w-36 object-cover" />
            <img src="/img/investors/flori.png" alt="Flori" className="max-w-16 object-cover" />
            <img src="/img/investors/allcoin.png" alt="Allcoin" className="max-w-48 object-cover" />
          </div>
          <div className="flex items-center md:flex-nowrap flex-wrap gap-x-12 gap-y-8 md:gap-24 justify-center mt-12 md:mt-0">
            <img src="/img/investors/rene-reinsberg.png" alt="Rene Reinsberg" className="max-w-56 object-cover" />
            <img src="/img/investors/marek-olszewski.png" alt="Marek Olszewski" className="max-w-56 object-cover" />
          </div>
        </div>
      </article>
      <article className="mb-10 sm:mb-14 md:mb-20">
        <p className="font-semibold text-[22px] sm:text-[24px] md:text-[28px] text-whitish py-4 md:py-5 w-fit gradientBorder mx-auto sm:mx-0">Social</p>
        <div className="flex items-center justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-3">
          <div className="w-[180px] h-[120px] sm:w-[220px] md:w-[244px] lg:w-[264px] sm:h-[140px] md:h-[160px] lg:h-[180px] border rounded-[20px] bg-darkBlue cursor-pointer group transition-all ease-in duration-200">
            <Link to="https://x.com/useremox?s=20" target="_blank" className="w-full h-full flex items-center justify-center">
              <SocialTwitter className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover overflow-hidden group-hover:fill-whitish transition-all ease-in duration-200" />
            </Link>
          </div>
          <div className="w-[180px] h-[120px] sm:w-[220px] md:w-[244px] lg:w-[264px] sm:h-[140px] md:h-[160px] lg:h-[180px] border rounded-[20px] bg-darkBlue cursor-pointer group transition-all ease-in duration-200">
            <Link to="https://discord.gg/7yF4mjHh" target="_blank" className="w-full h-full flex items-center justify-center">
              <SocialDiscord className=" w-14 h-14 sm:w-16 sm:h-16 object-cover overflow-hidden group-hover:fill-[#5470C6] transition-all ease-in duration-200" />
            </Link>
          </div>
          <div className="w-[180px] h-[120px] sm:w-[220px] md:w-[244px] lg:w-[264px] sm:h-[140px] md:h-[160px] lg:h-[180px] border rounded-[20px] bg-darkBlue cursor-pointer group transition-all ease-in duration-200">
            <Link to="https://medium.com/remoxhq" target="_blank" className="w-full h-full flex items-center justify-center">
              <SocialMedium className=" w-14 h-14 sm:w-16 sm:h-16 object-cover overflow-hidden group-hover:fill-whitish transition-all ease-in duration-200" />
            </Link>
          </div>
        </div>
      </article>
      <p className="text-center font-semibold text-base text-whitish">
      © {year} Remox, Inc.
      </p>
    </section>
  );
}

export default About;
