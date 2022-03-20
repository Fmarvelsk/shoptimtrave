import * as React from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { sendAppointmentBooking } from "@framework/requestBooking/booking-mutation";
import { toast } from "react-toastify";
import TextArea from "@components/ui/text-area";

const serviceOption = [
  "wigging",
  "revamping",
  "installation",
  "customisation",
  "washing",
  "retouching",
  "hair treatment",
];
interface AppointmentType {
  name: string;
  email: string;
  phoneNumber: string;
  date: any;
  additional_notes : string
}
const AppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const { closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentType>();
  const [capSize, setCapSize] = React.useState<string>("small");
  const [service, setService] = React.useState<string>("customisation");
  const [loading, setLoading] = React.useState<boolean>(false);

  async function onSubmit({ name, phoneNumber, date, email, additional_notes }: AppointmentType) {
    if (!Date.parse(date)) return toast.warn("Date and Time is required");
    setLoading(true);
    await sendAppointmentBooking({
      name,
      phoneNumber,
      date: date.toISOString(),
      email,
      cap_size: capSize,
      service: service,
      additional_notes,
    })
      .then((response) => {
        closeModal();
        toast.success(`Booked Appointment for ${response.name}`);
      })
      .catch((err) => {
        toast.error("Something went wrong, Unable to create appointment");
        console.log(err);
      });
    setLoading(false);
  }
  return (
    <div className="py-5 px-5 sm:px-8 rounded-lg bg-white mx-auto rounded-lg w-full sm:w-96 md:w-[650px] border border-gray-300">
      <h3 className="text-lg font-bold text-center text-black py-5">
        Appointment Form
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Service
            </label>

            <select
              onChange={(e: any) => setService(e.target.value)}
              className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12 capitalize"
            >
              {serviceOption.map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Cap Size
            </label>

            <select
              onChange={(e: any) => setCapSize(e.target.value)}
              className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <Input
            labelKey={`Date ${`&`} Time`}
            type="datetime-local"
            variant="solid"
            {...register("date", {
              valueAsDate: true,
              required: "forms:date-required",
            })}
            errorKey={errors.date?.message}
          />

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
            labelKey="Phone number"
            type="tel"
            variant="solid"
            {...register("phoneNumber", {
              required: "forms:phoneNumber-required",
            })}
            errorKey={errors.phoneNumber?.message}
          />
          
        <TextArea
          labelKey="forms:label-message"
          {...register("additional_notes")}
          className="relative mb-4"
          placeholderKey="forms:placeholder-message"
        />
          <div className="relative">
            <Button
              type="submit"
              className="h-11 md:h-12 w-full mt-2"
              loading={loading}
            >
              Book Now
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
