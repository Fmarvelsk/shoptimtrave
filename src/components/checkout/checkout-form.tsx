import React from "react";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
//import Payment from './payment'
import { usePushOrderedItem } from "@framework/product/product-mutation";
import { useCart } from "@contexts/cart/cart.context";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const secret_key = process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY;

interface CheckoutInputType {
  fName: string;
  lName: string;
  phoneNo: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  save: boolean;
}

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const { items, isEmpty, total, resetCart } = useCart();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [msgCarts, setMsgCarts] = React.useState<string>("");

  const config = {
    public_key: secret_key,
    tx_ref: Date.now(),
    amount: total,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phoneNumber,
      name: `${firstname} ${lastname}`,
    },

    customizations: {
      title: "Timtrave",
      description: "Payment for items in cart",
      logo: "https://chawk-shop.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1080&q=100",
    },
  };

  // @ts-ignore: Unreachable code error
  const handleFlutterPayment = useFlutterwave(config);

  function onSubmit(input: CheckoutInputType) {
    if (isEmpty) return setMsgCarts("Carts is Empty");
    setLoading(true);
    setMsgCarts("");
    handleFlutterPayment({
      callback: async (response: any) => {
        //console.log(response);
        await usePushOrderedItem({
          transactionId: response.transaction_id,
          fName: firstname,
          lName: lastname,
          phoneNo: response.customer.phone_number
            ? response.customer.phone_number
            : phoneNumber,
          email: response.customer.email,
          address: input.address,
          city: input.city,
          postcode: input.postcode,
          items: items.map((item) => ({
            name: item.name,
            sale_price: item.price,
            quantity: item.quantity,
            size: item.attributes.sizes || "",
            colour: item.attributes.colours,
            image: item.image,
          })),
        })
          .then(() => {
            resetCart();
            Router.push(ROUTES.ORDER);
          })
          .catch((err) => console.log(err));
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-shipping-address")}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register("fName", {
                required: "forms:first-name-required",
              })}
              errorKey={errors.fName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
              onChange={(e: any) => setFirstname(e.target.value)}
            />
            <Input
              labelKey="forms:label-last-name"
              {...register("lName", {
                required: "forms:last-name-required",
              })}
              errorKey={errors.lName?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
              onChange={(e: any) => setLastname(e.target.value)}
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 gap-3 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register("phoneNo", {
                required: "forms:phone-required",
              })}
              onChange={(e: any) => setPhoneNumber(e.target.value)}
              errorKey={errors.phoneNo?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <div className="w-full lg:w-1/2 ">
              <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                Email *
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                //style={{border : '1px solid black'}}
                className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
              />
            </div>
          </div>

          <Input
            labelKey="forms:label-address"
            {...register("address", {
              required: "forms:address-required",
            })}
            errorKey={errors.address?.message}
            variant="solid"
          />

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-city"
              {...register("city")}
              variant="solid"
              /*onChange={(e) => }*/
              className="w-full lg:w-1/2 "
            />

            <Input
              labelKey="forms:label-postcode"
              {...register("postcode")}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>

          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              loading={isLoading}
              disabled={isLoading}
            >
              {t("common:button-place-order")}
            </Button>
          </div>
        </div>
        <p className="text-red-500">{msgCarts}</p>
      </form>
    </>
  );
};

export default CheckoutForm;
