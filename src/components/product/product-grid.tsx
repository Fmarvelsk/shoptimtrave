import ProductCard from "@components/product/product-card";
//import Button from "@components/ui/button";
import type { FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
interface ProductGridProps {
  className?: string;
  slug?: any;
  isLoading: boolean;
  data: [];
  error: unknown;
}

export const ProductGrid: FC<ProductGridProps> = ({
  className = "",
  isLoading,
  data,
  error,
}) => {
  if (error) return <p>Error something went wrong</p>;

  //	const { t } = useTranslation("common");
  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.map((product: any) => (
            <ProductCard
              key={`product--key${product.id}`}
              product={product}
              variant="grid"
            />
          ))
        )}
        {data?.length < 1 && <div> No Product Fot these Categories</div>}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {/*hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)*/}
      </div>
    </>
  );
};
