import Layout from "@components/layout/layout";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
/**py-12 md:py-14 xl:py-16 */
export default function Home() {
  return (
    <>
      <BannerBlock data={masonryBanner} />
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "menu", "footer"])),
    },
  };
};
