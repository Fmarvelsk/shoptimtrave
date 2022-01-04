import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
//import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useGQLQuery } from "@framework/product/product-queries";

export default function Products() {
  const {
    data,
    isFetching: isLoading,
    error,
  } = useGQLQuery("allproduct", {
    code: "SE",
  });

  return (
    <>
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="w-full lg:-ms-9">
            <SearchTopBar total={data?.returnAllProduct?.length} />
            <ProductGrid
              data={data?.returnAllProduct}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
}

Products.Layout = Layout;

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
