import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
//import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useGQLQuery } from "@framework/product/product-queries";
import StickyBox from "react-sticky-box";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useTranslation } from "next-i18next";

export default function Products() {
  const { t } = useTranslation("common");

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
          <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink
                    href={"/"}
                    activeClassName="font-semibold text-heading"
                  >
                    <a>{t("breadcrumb-home")}</a>
                  </ActiveLink>
                  <ActiveLink
                    href={"/products"}
                    activeClassName="font-semibold text-heading"
                  >
                    <a className="capitalize">{t("products")}</a>
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
            </StickyBox>
          </div>

          <div className="w-full lg:-ms-9">
            <SearchTopBar total={data?.returnAllProduct?.length} />
            <ProductGrid
              data={data?.returnAllProduct}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
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
