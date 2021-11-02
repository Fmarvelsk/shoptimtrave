import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from "react-icons/io5";

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: "widget-title-social",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/redqinc/",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "link-twitter",
          path: "https://twitter.com/redqinc",
          icon: <IoLogoTwitter />,
        },
        {
          id: 3,
          title: "link-facebook",
          path: "https://www.facebook.com/redqinc/",
          icon: <IoLogoFacebook />,
        },
        {
          id: 4,
          title: "link-youtube",
          path: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
          icon: <IoLogoYoutube />,
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "widget-title-contact",
      lists: [
        {
          id: 1,
          title: "link-contact-us",
          path: "/contact-us",
        },
        {
          id: 2,
          title: "link-email",
          path: "/",
        },
        {
          id: 3,
          title: "link-phone",
          path: "/",
        },
      ],
    },
    {
      id: 3,
      widgetTitle: "widget-title-about",
      lists: [
        {
          id: 1,
          title: "link-about-us",
          path: "/contact-us",
        },
        {
          id: 2,
          title: "link-faq",
          path: "/faq",
        },
        {
          id: 4,
          title: "link-copyright",
          path: "/",
        },
      ],
    },
    {
      id: 4,
      widgetTitle: "widget-title-our-information",
      lists: [
        {
          id: 1,
          title: "link-privacy",
          path: "/privacy",
        },
        {
          id: 2,
          title: "link-terms",
          path: "/terms",
        },
        {
          id: 3,
          title: "link-return-policy",
          path: "/privacy",
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: "/",
      image: "/assets/images/payment/mastercard.svg",
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "/",
      image: "/assets/images/payment/visa.svg",
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: "/",
      image: "/assets/images/payment/paypal.svg",
      name: "payment-paypal",
      width: 76,
      height: 20,
    },
    {
      id: 4,
      path: "/",
      image: "/assets/images/payment/jcb.svg",
      name: "payment-jcb",
      width: 26,
      height: 20,
    },
    {
      id: 5,
      path: "/",
      image: "/assets/images/payment/skrill.svg",
      name: "payment-skrill",
      width: 39,
      height: 20,
    },
  ],
};
