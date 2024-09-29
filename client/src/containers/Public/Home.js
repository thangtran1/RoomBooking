import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Footer, Intro, Help } from "../../components";
import { path } from "../../ultils/constant";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { IoIosArrowRoundUp } from "react-icons/io";
import logos from "../../assets";
import { Button } from "antd";
import { FaQuestion } from "react-icons/fa";

const Home = () => {
  const location = useLocation();
  const navRef = useRef();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />
      <div className="w-full flex gap-6 flex-col items-center h-full">
        <div className="hidden lg:flex fixed top-0 bottom-0 left-6 items-center justify-center">
          <div className="h-[300px] w-[120px]">
            <img src={logos.banner_left} alt="logo 2" />
          </div>
        </div>

        <div ref={navRef} className="w-full">
          <Navigation />
        </div>

        {location.pathname !== `/${path.CONTACT}` &&
          !location.pathname?.includes(path.DETAIL) &&
          location.pathname !== `/${path.SAVE_NEW}` &&
          location.pathname !== `/${path.LOGIN}` && <Search />}

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
            className="fixed bottom-24 right-10 bg-[#f83859] w-[65px] h-[65px] flex items-center justify-center rounded-full shadow-md"
          >
            <IoIosArrowRoundUp color="white" size={50} />
          </button>
        )}

        {/* Nút để mở modal Help */}
        <Button
          onClick={showModal}
          className="fixed bottom-7 right-10 bg-[#03a84e] text-white w-[65px] h-[65px] flex items-center justify-center rounded-full shadow-md"
        >
          <div className="flex flex-col items-center justify-center">
            <p>
              <FaQuestion size={20} />
            </p>
            <p>Trợ giúp</p>
          </div>
        </Button>

        {/* Sử dụng component Help */}
        <Help visible={isModalVisible} onClose={handleCancel} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
