import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import Link from "@components/ui/link";
import Logo from "@components/ui/logo";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import LanguageSwitcher from "@components/ui/language-switcher";
//const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
//const { site_header } = siteSettings;
const Header: React.FC = () => {
  const { openSidebar, setDrawerView, openSearch } = useUI();
  const {
    query: { slug },
  } = useRouter();

  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  function handleMobileMenu() {
    setDrawerView("MOBILE_MENU");
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <span className="menuIcon">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>
          <Logo />
          {slug === "beauty" && (
            <nav className={`headerMenu justify-center flex w-full relative`}>
              <Link
                href="/book-appointment"
                className="inline-flex items-center text-xs xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
              >
                Book Appointment
              </Link>
              <Link
                href="/custom-order"
                className="inline-flex items-center text-xs xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
              >
                Custom Order
              </Link>
              <Link
                href="/service-list"
                className="inline-flex items-center text-xs xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
              >
                Service Price List
              </Link>
            </nav>
          )}
          <div className="lang">
            <LanguageSwitcher />
          </div>
          <div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
            <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            {/*<div className="-mt-0.5 flex-shrink-0">
							<AuthMenu
								isAuthorized={isAuthorized}
								href={ROUTES.ACCOUNT}
								className="text-sm xl:text-base text-heading font-semibold"
								btnProps={{
									className:
										"text-sm xl:text-base text-heading font-semibold focus:outline-none",
									children: t("text-sign-in"),
									onClick: handleLogin,
								}}
							>
								{t("text-account")}
							</AuthMenu>
							</div>*/}
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
