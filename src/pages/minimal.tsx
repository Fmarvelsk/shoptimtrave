import Container from "@components/ui/container";
import BrandBlock from "@containers/brand-block";
import CategoryGridBlock from "@containers/category-grid-block";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import HeroWithCategory from "@containers/hero-with-category";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import Subscription from "@components/common/subscription";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";


export default function Home() {
	return (
		<Container>
			<HeroWithCategory />
			{/*<ProductsWithFlashSale carouselBreakpoint={flashSaleCarouselBreakpoint} />
			<BannerGridBlock />*/}
			<CategoryGridBlock sectionHeading="text-featured-categories" />
			<Divider />
			<BestSellerProductFeed />
			{/*<BannerCard
				key={`banner--key${banner.id}`}
				banner={banner}
				href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
				className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
			/>*/}
			<NewArrivalsProductFeed />
			<Divider />
			<BrandBlock sectionHeading="text-top-brands" />
			<Subscription />
		</Container>
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
