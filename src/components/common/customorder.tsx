import * as React from "react";
import cn from "classnames";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { sendCustomBeautyOrder } from "@framework/requestBooking/booking-mutation";
import { toast } from "react-toastify";
import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";

const sizeInches = [
  `8`,
  `10`,
  `12`,
  `14`,
  `16`,
  `18`,
  `20`,
  `22`,
  `24`,
  `26`,
  `28`,
  `30`,
  `32`,
  `34`,
  `36`,
  `38`,
];
const texture = [
  "afro curl",
  "kinky curl",
  "deep curl",
  "kinky straight",
  "straight",
  "body wave",
  "bob",
  "pixie",
  "pixie curly",
];
interface CustomBeautyForm {
  notes: string;
  name: string;
  email: string;
  phoneNumber: string;
}
const CustomBeautyOrder: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomBeautyForm>();
  const { t } = useTranslation();
  const [capSize, setCapSize] = React.useState<string>("small");
  const [gram, setGram] = React.useState<string>("200g");
  const [length, setLength] = React.useState<string>(sizeInches[0]);
  const [hairType, setHairType] = React.useState<string>("single drawn");
  const [hairTexture, setHairTexture] = React.useState<string>(texture[0]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageStyle, setImageStyle] = React.useState<string>("");
  const [imageColor, setImageColor] = React.useState<string>("");

  async function upLoadImageToCloudinary(e: any) {
    const imageUpload = e.target;
    const file = imageUpload.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "timtrave");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dafscwjdg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
    if (imageUpload.name === "style_inspiration") {
      setImageStyle(data.secure_url);
    } else {
      setImageColor(data.secure_url);
    }
  }

  async function onSubmit(value: CustomBeautyForm) {
    const data = {
      ...value,
      cap_size: capSize,
      gram: gram,
      hair_texture: hairTexture,
      hair_type: hairType,
      length: `${length} inches`,
      colour: imageColor,
      style_inspiration: imageStyle,
    };
    setLoading(true);
    await sendCustomBeautyOrder(data)
      .then(() => {
        toast.success(`Sucessfully Requested for custom for ${value.name}`);
      })
      .catch((err) => {
        toast.error("Something went wrong, Unable to create appointment");
        console.log(err);
      });
    setLoading(false);
  }

  return (
    <div className={cn("pb-6 md:pb-7 leading-7 text-sm text-gray-600")}>
      <h3 className="font-bold text-lg text-black">Custom order note </h3>
      <p className="py-7">
        Thank you for visiting our website. Fill the form if you want a custom
        made wig and our customer support will contact you soon for easy
        communication about your custom unit.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          labelKey="forms:label-name"
          type="text"
          required
          className="pt-3"
          variant="solid"
          {...register("name", {
            required: "forms:name-required",
          })}
          errorKey={errors.name?.message}
        />
        <Input
          labelKey="forms:label-email"
          type="email"
          className="pt-5"
          required
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
          required
          className="pt-5"
          variant="solid"
          {...register("phoneNumber", {
            required: "forms:phoneNumber-required",
          })}
          errorKey={errors.phoneNumber?.message}
        />

        <div className="flex flex-col pt-5 space-y-4">
          <div className="w-full">
            <label className="block required text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
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

          <div className="w-full pt-3">
            <label className="required block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Gram
            </label>

            <select
              onChange={(e: any) => setGram(e.target.value)}
              className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12"
            >
              <option value="250g">200g</option>
              <option value="300g">300g</option>
              <option value="350g">350g</option>
              <option value="400g">400g</option>
            </select>
          </div>

          <div className="w-full pt-3">
            <label className="block required text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Hair Type
            </label>

            <select
              onChange={(e: any) => setHairType(e.target.value)}
              className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12"
            >
              <option value="single drawn">Single Drawn</option>
              <option value="double drawn">Double Drawn</option>
              <option value="super double drawn">Super Double Drawn</option>
            </select>
          </div>

          <div className="w-full pt-3">
            <label className="block required text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Hair Texture
            </label>

            <select
              onChange={(e: any) => setHairTexture(e.target.value)}
              className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12 capitalize"
            >
              {texture.map((texture, i) => (
                <option key={i} value={texture}>
                  {texture}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full pt-3">
            <label className="block required text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
              Length inches
            </label>

            <select
              onChange={(e: any) => setLength(e.target.value)}
              className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12"
            >
              {sizeInches.map((size, i) => (
                <option key={i} value={size}>
                  {size}""
                </option>
              ))}
            </select>
          </div>
          <div className="flex pt-3 flex-wrap justify-between">
            <div className="mb-3 lg:mb-0">
              <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                Style Inspiration (Upload Image)
              </label>
              <input
                type="file"
                onChange={upLoadImageToCloudinary}
                name="style_inspiration"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                Colour (Upload Image)
              </label>

              <input
                type="file"
                onChange={upLoadImageToCloudinary}
                name="color"
              />
            </div>
          </div>
          <TextArea
            labelKey="Additional Notes"
            {...register("notes")}
            className="relative pt-3 mb-4"
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

export default CustomBeautyOrder;
