import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
//import Payment from './payment'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
}

const CheckoutForm: React.FC = () => {
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
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
		console.log('me')
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const cardElement = elements.getElement(CardElement);

		if (cardElement) {
			const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
				payment_method: {
					card: cardElement,
					billing_details: {
						name: 'Jenny Rosen',
					},
				}
			})

			if (result.error) {
				// Show error to your customer (e.g., insufficient funds)
				console.log(result.error.message);
			} else {
				// The payment has been processed!
				if (result.paymentIntent.status === 'succeeded') {
					// Show a success message to your customer
					// There's a risk of the customer closing the window before callback
					// execution. Set up a webhook or plugin to listen for the
					// payment_intent.succeeded event that handles any business critical
					// post-payment actions.
					updateUser(input)
				}
			}
		};
		Router.push(ROUTES.ORDER);
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
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							errorKey={errors.lastName?.message}
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
							{...register("phone", {
								required: "forms:phone-required",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>

						<Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
							{...register("zipCode")}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>

					</div>
					<div>
					<label className="block mb-2 text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
						Card details</label>
						<CardElement options={CARD_ELEMENT_OPTIONS} className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0" />
					</div>

					<div className="relative flex items-center ">
						<CheckBox labelKey="forms:label-save-information" />
					</div>
					<TextArea
						labelKey="forms:label-order-notes"
						{...register("note")}
						placeholderKey="forms:placeholder-order-notes"
						className="relative pt-3 xl:pt-6"
					/>
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
