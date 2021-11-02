interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price?: number;
  sale_price: number;
  [key: string]: unknown;
}
export function generateCartItem(
  item: Item,
  attributes: object,
  quantity: number
) {
  const { id, name, slug, image, sale_price } = item;
  return {
    id: id,
    name,
    slug,
    quantity,
    image: image,
    price: sale_price,
    attributes,
  };
}
