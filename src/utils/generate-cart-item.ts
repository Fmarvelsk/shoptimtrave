interface Item {
  id: string | number;
  name: string;
  slug: string;
  images: Array<string>;
  price?: number;
  sale_price: number;
  [key: string]: unknown;
}
export function generateCartItem(
  item: Item,
  attributes: object,
  quantity: number
) {
  const { id, name, slug, images, sale_price } = item;
  return {
    id: id,
    name,
    slug,
    quantity,
    image: images,
    price: sale_price,
    attributes,
  };
}
