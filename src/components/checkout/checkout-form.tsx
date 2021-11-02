import React from "react";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
//import Payment from './payment'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  usePaymentMutation,
  usePushOrderedItem,
} from "@framework/product/product-mutation";
import { useCart } from "@contexts/cart/cart.context";

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
  const { items, isEmpty, resetCart } = useCart();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();

  const stripe = useStripe();
  const elements = useElements();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  async function onSubmit(input: CheckoutInputType) {
    let cardElement;
    if (!stripe || !elements || isEmpty) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);

    let variables = items.map((item) => ({
      quantity: item.quantity,
      sale_price: item.price,
    }));

    await usePaymentMutation(variables)
      .then(async (res) => {
        cardElement = elements.getElement(CardElement);

        if (cardElement) {
          const result = await stripe.confirmCardPayment(`${res.makePayment}`, {
            payment_method: {
              card: cardElement,
              /*	billing_details: {
								name: 'Jenny Rosen',
							},*/
            },
          });

          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              await usePushOrderedItem({
                ...input,
                items: items.map((item) => ({
                  name: item.name,
                  sale_price: item.price,
                  quantity: item.quantity,
                  size: item.attributes.sizes,
                  colour: item.attributes.colours,
                  image: item.image,
                })),
              })
                .then(() => {
                  resetCart();
                  Router.push(ROUTES.ORDER);
                })
                .catch((err) => console.log(err));
            }
          }
        }
      })
      .catch((err) => console.log(err));
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
            />
            <Input
              labelKey="forms:label-last-name"
              {...register("lName", {
                required: "forms:last-name-required",
              })}
              errorKey={errors.lName?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
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
              type="tel"
              labelKey="forms:label-phone"
              {...register("phoneNo", {
                required: "forms:phone-required",
              })}
              errorKey={errors.phoneNo?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register("email", {
                required: "forms:email-required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "forms:email-error",
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-city"
              {...register("city")}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              labelKey="forms:label-postcode"
              {...register("postcode")}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Card details
            </label>
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>

          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information" />
          </div>
          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              loading={isLoading}
              disabled={isLoading || !stripe}
            >
              {t("common:button-place-order")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
