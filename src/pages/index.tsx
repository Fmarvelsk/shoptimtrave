import Container from "@components/ui/container";
//import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
//import ProductsFeatured from "@containers/products-featured";
import Subscription from "@components/common/subscription";
//import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <>
      <BannerBlock data={masonryBanner} />
      <Container>
        <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
