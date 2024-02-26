// import OrgCart from "@components/core/org-cart";
// import OrgCartSkeleton from "@components/core/org-cart-skeleton";
import SearchBar from "@components/general/searchBar"
import EmptyOrg from "@components/core/emptyOrg"

function MyCreations() {
  return (
    <>
    <SearchBar title="My Creations" type="my" />
    <section className="flex items-center justify-center">
      <EmptyOrg name="Creations"/>
    </section>
    
    <section className="my-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid gap-3 md:gap-4 lg:gap-5 xl:gap-6 ">
      {/* <OrgCart name="Lido" balance={3423442} isFav={false} isAccessed isVerify isDisabled link="lido" image="/img/orglogo.png" /> */}
    </section>
  </>
  )
}

export default MyCreations