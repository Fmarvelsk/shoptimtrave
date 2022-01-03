import { ILFlag } from "@components/icons/ILFlag";
import { SAFlag } from "@components/icons/SAFlag";
import { CNFlag } from "@components/icons/CNFlag";
import { USFlag } from "@components/icons/USFlag";
import { DEFlag } from "@components/icons/DEFlag";
import { ESFlag } from "@components/icons/ESFlag";
export const siteSettings = {
  name: "Timtrave",
  description:
    "Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.",
  logo: {
    url: "/assets/images/logo.svg",
    alt: "Timtrave",
    href: "/",
    width: 95,
    height: 30,
  },
  defaultLanguage: "en",
  currencyCode: "USD",
  site_header: {
    menu: [
      {
        id: 1,
        path: "/",
        label: "menu-demos",
        subMenu: [
          {
            id: 1,
            path: "/",
            label: "menu-modern",
          },
          {
            id: 2,
            path: "/standard",
            label: "menu-standard",
          },
          {
            id: 3,
            path: "/minimal",
            label: "menu-minimal",
          },
          {
            id: 4,
            path: "/vintage",
            label: "menu-vintage",
          },
          {
            id: 5,
            path: "/classic",
            label: "menu-classic",
          },
        ],
      },
      {
        id: 2,
        path: "/standard",
        label: "Cosmetic",
      },

      {
        id: 3,
        path: "/minimal",
        label: "Boutique",
      },

      {
        id: 4,
        path: "/search",
        label: "menu-search",
      },
      {
        id: 5,
        path: "/",
        label: "menu-pages",
        subMenu: [
          {
            id: 1,
            path: "/faq",
            label: "menu-faq",
          },
          {
            id: 2,
            path: "/privacy",
            label: "menu-privacy-policy",
          },
          {
            id: 3,
            path: "/terms",
            label: "menu-terms-condition",
          },
          {
            id: 4,
            path: "/contact-us",
            label: "menu-contact-us",
          },
          {
            id: 5,
            path: "/checkout",
            label: "menu-checkout",
          },
          {
            id: 6,
            path: "/collections/mens-collection",
            label: "menu-collection",
          },
          {
            id: 7,
            path: "/category/man",
            label: "menu-category",
          },
        ],
      },
    ],
    mobileMenu: [
      {
        id: 1,
        path: "/",
        label: "menu-modern",
      },
      {
        id: 2,
        path: "/standard",
        label: "Cosmetic",
      },

      {
        id: 3,
        path: "/minimal",
        label: "Boutique",
      },
      {
        id: 6,
        path: "/search",
        label: "menu-search",
      },
      {
        id: 7,
        path: "/",
        label: "menu-pages",
        subMenu: [
          {
            id: 1,
            path: "/faq",
            label: "menu-faq",
          },
          {
            id: 2,
            path: "/privacy",
            label: "menu-privacy-policy",
          },
          {
            id: 3,
            path: "/terms",
            label: "menu-terms-condition",
          },
          {
            id: 4,
            path: "/contact-us",
            label: "menu-contact-us",
          },
        ],
      },
    ],
    languageMenu: [
      {
        id: "ar",
        name: "عربى - AR",
        value: "ar",
        icon: <SAFlag width="20px" height="15px" />,
      },
      {
        id: "zh",
        name: "中国人 - ZH",
        value: "zh",
        icon: <CNFlag width="20px" height="15px" />,
      },
      {
        id: "en",
        name: "English - EN",
        value: "en",
        icon: <USFlag width="20px" height="15px" />,
      },
      {
        id: "de",
        name: "Deutsch - DE",
        value: "de",
        icon: <DEFlag width="20px" height="15px" />,
      },
      {
        id: "he",
        name: "rעברית - HE",
        value: "he",
        icon: <ILFlag width="20px" height="15px" />,
      },
      {
        id: "es",
        name: "Español - ES",
        value: "es",
        icon: <ESFlag width="20px" height="15px" />,
      },
    ],
  },
};
