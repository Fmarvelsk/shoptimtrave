//import { OrderItem } from "@framework/types";
import { useTranslation } from "next-i18next";

const OrderDetails: React.FC<{ className?: string }> = ({
  className = "pt-10 lg:pt-12",
}) => {
  const { t } = useTranslation("common");
  return (
    <div className={className}>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-order-details")}:
      </h2>
      <table className="w-full text-heading font-semibold text-sm lg:text-base">
        <thead>
          <tr>
            <th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
              {t("text-product")}
            </th>
            <th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
              {t("text-total")}
            </th>
          </tr>
        </thead>
        <tbody>
          {/*order?.products.map((product, index) => (
						<OrderItemCard key={index} product={product} />
					))*/}
        </tbody>
        <tfoot>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-sub-total")}:</td>
            <td className="p-4">{/*subtotal*/}</td>
          </tr>

          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-payment-method")}:</td>
            <td className="p-4">{/*order?.payment_gateway*/}</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-total")}:</td>
            <td className="p-4">
              {/*total
               */}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
