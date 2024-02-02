import { useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Navbar from "@components/shared/navbar";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
const AnimatedOutlet = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};
function Layout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <Navbar />
      <main className="container mt-8 ">
        <AnimatePresence>
          <LazyMotion  features={domAnimation}>
            <m.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7, ease: "backInOut" } }}
              exit={{opacity:0}}
              
            >
              <AnimatedOutlet />
            </m.div>
          </LazyMotion>
        </AnimatePresence>
      </main>
    </>
  );
}

export default Layout;
