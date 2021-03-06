import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { useTranslation } from "next-i18next";
import EmblaCarousel from "@components/carousel/carousel";

interface IPriceRange {
  price: number;
  size: string;
}
export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();
  const router = useRouter();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [select, setIsSelected] = useState<boolean>(false);
  const [selectSize, setIsSelectedSize] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<boolean>(false);
  const [outOfStockMessage, setOutOfStockMessage] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number>(
    data.sale_price ? data.sale_price : data.price
  );
  const [priceRange, setPriceRange] = useState<Array<IPriceRange>>(
    data.price_range
  );

  const { price, basePrice, discount } = usePrice({
    amount: newPrice,
    baseAmount: data.price,
    currencyCode: "USD",
  });
  const {
    sizes,
    images,
    name,
    description,
    price_range,
    closure_types,
    out_of_stock,
    category,
  } = data;

  /*  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
    Object.keys(variations).every((variation) =>
      attributes.hasOwnProperty(variation)
    )
    : true;*/

  function addToCart() {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
      setViewCartBtn(true);
    }, 600);
    let newData = {
      id: data.id,
      images: data.images,
      name: data.name,
      description: data.description,
      sale_price: newPrice,
      category: data.category,
    };
    const item = generateCartItem(newData!, attributes, quantity);
    addItemToCart(item, quantity);
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${name}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any, title: string) {
    setPriceRange([]);
    if (out_of_stock && out_of_stock[title] === attribute[title])
      return setOutOfStockMessage(`${out_of_stock[title]} is out of stock`);

    if (attribute.sizes && price_range.length > 0) {
      price_range.forEach((price: any) => {
        if (price.size === attribute.sizes) setNewPrice(Number(price.price));
      });
    }
    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
    setOutOfStockMessage("");
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }
  useEffect(() => {
    if (sizes.length === 0) setIsSelectedSize(true);
    if (closure_types.length === 0) setSelectedType(true);
  }, [sizes]);

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden">
          <EmblaCarousel slides={images} />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                {name}
              </h2>
            </div>

            {category === "beauty" && <p> WIG IN THE PICTURE </p>}
            <ul style={{ listStyle: "disc" }}>
              {Object.keys(description).map((key, desc) => {
                return (
                  <li
                    className={`${description[key] === null && "hidden"}`}
                    key={desc}
                  >
                    {description[key] !== null ? (
                      <p className="text-sm capitalize font-bold leading-6 md:text-body md:leading-7">
                        {key} : {description[key]}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {priceRange?.length > 1
                  ? ` $${priceRange[0].price.toFixed(2)} - $${priceRange
                      .slice(-1)[0]
                      .price.toFixed(2)}`
                  : price}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>
          {out_of_stock && out_of_stock?.all ? (
            <div className="text-red-400 text-base">Out of Stock</div>
          ) : (
            <>
              {sizes.length >= 1 && (
                <ProductAttributes
                  title={"sizes"}
                  isSelected={setIsSelectedSize}
                  attributes={sizes}
                  active={attributes.sizes}
                  onClick={handleAttribute}
                />
              )}
              <ProductAttributes
                cls
                title={"colours"}
                isSelected={setIsSelected}
                attributes={data.colours}
                active={attributes.colours}
                onClick={handleAttribute}
              />
              {closure_types.length >= 1 && (
                <ProductAttributes
                  title={"closure types"}
                  isSelected={setSelectedType}
                  attributes={closure_types}
                  active={attributes["closure types"]}
                  onClick={handleAttribute}
                />
              )}
            </>
          )}
          {outOfStockMessage && (
            <div className="text-red-400 text-base">{outOfStockMessage}</div>
          )}

          {!out_of_stock && !out_of_stock?.all && (
            <div className="pt-2 md:pt-4">
              <div className="flex items-center justify-between mb-4 space-s-3 sm:space-s-4">
                <Counter
                  quantity={quantity}
                  onIncrement={() => setQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disableDecrement={quantity === 1}
                />
                <Button
                  onClick={addToCart}
                  variant="flat"
                  className={`w-full h-11 md:h-12 px-1.5 ${
                    !select || !selectSize || !selectedType
                      ? "bg-gray-400 hover:bg-gray-400"
                      : ""
                  }`}
                  disabled={!select || !selectSize || !selectedType}
                  loading={addToCartLoader}
                >
                  {t("text-add-to-cart")}
                </Button>
              </div>

              {viewCartBtn && (
                <button
                  onClick={navigateToCartPage}
                  className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
                >
                  {t("text-view-cart")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
