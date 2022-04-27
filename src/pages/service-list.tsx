import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
//import CustomBeautyOrder from "@components/common/customorder";

const Pricelist = [
  { name: "hair installation", price: 15 },
  { name: "eyelash fixing", price: 5 },
  { name: "hair styling", price: 15 },
  { name: "wig revamping", price: 27 },
  { name: "eyelash fixing", price: 5 },
  { name: "hair colouring", price: 30 },
  { name: "sew-in installation", price: 30 },
  { name: "wig making", price: 25 },
  { name: "hair washing (with treatment)", price: 15 },
  { name: "hair washing (without treatment)", price: 8 },
  { name: "hair retouch (without treatment)", price: 18 },
  { name: "hair retouch (with treatment)", price: 25 },
  { name: "natural hair treatment" },
];

export default function ServicePriceList() {
  return (
    <>
      <PageHeader pageHeader="Service Price List " />
      <Container>
        <div className="md:w-9/12 py-12 " style={{ margin: "auto" }}>
          <div>
            <h3 className="font-bold text-lg text-black">SERVICE PRICE LIST</h3>
            <ul className="mb-5" style={{ listStyle: "disc" }}>
              {Pricelist.map((list, index) => (
                <li className="py-3 capitalize" key={index}>
                  {list.name} :{" "}
                  <b>{list.price ? "$" + list.price : "Contact us"}</b>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-bold text-base">
            Kindly NOTE that every service rendered without an appointment will
            attract an extra $5 fee.
          </p>
        </div>
      </Container>
    </>
  );
}

ServicePriceList.Layout = Layout;

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
