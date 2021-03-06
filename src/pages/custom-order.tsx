import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import CustomBeautyOrder from "@components/common/customorder";

export default function CustomOrder() {
  return (
    <>
      <PageHeader pageHeader="Custom Order " />
      <Container>
        <div className="md:w-9/12 py-12 " style={{ margin: "auto" }}>
          <CustomBeautyOrder />
        </div>
      </Container>
    </>
  );
}

CustomOrder.Layout = Layout;

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
