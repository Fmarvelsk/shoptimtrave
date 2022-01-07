import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  //IoLogoYoutube,
} from "react-icons/io5";

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: "Beauty",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/aloverest/",
          icon: <IoLogoInstagram />,
        },
       ],
    },
    {
      id: 2,
      widgetTitle: "Clothing",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/timtraveww/",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "link-twitter",
          path: "https://twitter.com/timtraveww",
          icon: <IoLogoTwitter />,
        },
        {
          id: 3,
          title: "link-facebook",
          path: "https://www.facebook.com/Timtraveclothing/",
          icon: <IoLogoFacebook />,
        },
        /*{
          id: 4,
          title: "link-youtube",
          path: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
          icon: <IoLogoYoutube />,
        },*/
      ],
    },
    {
      id: 3,
      widgetTitle: "Media",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/timtravemedia/",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "link-twitter",
          path: "https://twitter.com/timtraveww",
          icon: <IoLogoTwitter />,
        },
        {
          id: 3,
          title: "link-facebook",
          path: "https://www.facebook.com/timetravelersmedia/",
          icon: <IoLogoFacebook />,
        },
        /*{
          id: 4,
          title: "link-youtube",
          path: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
          icon: <IoLogoYoutube />,
        },*/
      ],
    },
    
    {
      id: 4,
      widgetTitle: "widget-title-contact",
      lists: [
        {
          id: 1,
          title: "link-contact-us",
          path: "/contact-us",
        },
        
        {
          id: 2,
          title: "timtraveww@gmail.com",
          path: "mailto:timtraveww@gmail.com",
        },
        {
          id: 3,
          title: "link-phone",
          path: "/",
        },
        {
          id: 4,
          title: "link-faq",
          path: "/faq",
        },
   
      ],
    },
   /* {
      id: 5,
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
      id: 6,
      widgetTitle: "widget-title-our-information",
      lists: [
        {
          id: 1,
          title: "link-terms",
          path: "/terms",
        },
        {
          id: 2,
          title: "link-return-policy",
          path: "/privacy",
        },
      ],
    },*/
  ],
};
