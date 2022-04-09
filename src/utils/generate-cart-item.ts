interface Item {
  id: string | number;
  name: string;
  category: string;
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
  const { id, name, images, sale_price, category } = item;
  return {
    id: id,
    name,
    category,
    quantity,
    image: images,
    price: sale_price,
    attributes,
  };
}
