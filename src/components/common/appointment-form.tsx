import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import ListBox from "@components/ui/list-box";

interface AppointmentType {
name : string,
email : string,
phoneNo : string
}
const SignUpForm: React.FC = () => {
	const { t } = useTranslation();
	//const { mutate: signUp, isLoading } = useSignUpMutation();
	const { setModalView, openBookingModal, closeBookingModal } = useUI();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AppointmentType>();

	function handleSignIn() {
		setModalView("BOOKING_VIEW");
		return openBookingModal();
	}

	function onSubmit({ email }: AppointmentType) {
		  console.log(email)
		;
	}
	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeBookingModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("common:registration-helper")}{" "}
					<Link
						href={ROUTES.TERMS}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-terms")}
					</Link>{" "}
					&amp;{" "}
					<Link
						href={ROUTES.POLICY}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-policy")}
					</Link>
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<Input
						labelKey="forms:label-name"
						type="text"
						variant="solid"
						{...register("name", {
							required: "forms:name-required",
						})}
						errorKey={errors.name?.message}
					/>
					<Input
						labelKey="forms:label-email"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${t("forms:email-required")}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t("forms:email-error"),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<Input
						labelKey="forms:label-phone"
                        type="tel"
                        variant="solid"
						{...register("phoneNo", {
							required: "forms:phoneNo-required",
						})}
						errorKey={errors.phoneNo?.message}
					/>
				<ListBox/>
					<div className="relative">
						<Button
							type="submit"
							className="h-11 md:h-12 w-full mt-2"
						>
							{t("common:text-login")}
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>

			<Button
				type="submit"
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
			>
				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-facebook")}
			</Button>
			<Button
				type="submit"
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-google")}
			</Button>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-have-account")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t("common:text-login")}
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;