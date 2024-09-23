import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Footer, Intro } from "../../components";
import { path } from "../../ultils/constant";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { FaArrowUp } from "react-icons/fa";
import logos from "../../assets";
const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const navRef = useRef();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= 134) {
        navRef.current.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;`;
      } else {
        navRef.current.style.cssText = `width: 100%`;
      }

      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header className=" " />
      <div className="w-full flex gap-6 flex-col items-center h-full">
        <div className="hidden lg:flex fixed top-0 bottom-0 left-6 items-center justify-center">
          <div className="h-[300px] w-[120px]">
            <img src={logos.banner_left} alt="logo 2" />
          </div>
        </div>

        <div ref={navRef} className="w-full">
          <Navigation />
        </div>
        {isLoggedIn &&
          location.pathname !== `/${path.CONTACT}` &&
          !location.pathname?.includes(path.DETAIL) && <Search />}
        <div className="w-4/5 lg:w-4/5 flex flex-col items-start justify-start mt-3">
          <Outlet />
        </div>
        <Intro />
        <Contact />

        <div className="hidden lg:flex fixed top-0 bottom-0 right-6 items-center justify-center">
          <div className="h-[300px] w-[120px]">
            <img src={logos.banner_right} alt="logo 2" />
          </div>
        </div>

        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 bg-[rgb(199,223,252)] text-black w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-md  hover:bg-red-400 transition-all"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
