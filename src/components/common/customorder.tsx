import * as React from 'react'
import cn from "classnames";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';


interface CustomBeautyForm {
    cap_size: string
    gram: string
    hair_texture: string
    length: string
    style_inspiration: string
    colour: string
    notes: string
}
const CustomBeautyOrder: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomBeautyForm>();
    const [capSize, setCapSize] = React.useState<string>("small")
    const [gram, setGram] = React.useState<string>("200g")
    const [lenght, setLength] = React.useState<string>(`8"`)
    const [hairTexture, setHairTexture] = React.useState<string>("double drawn")
    const [loading, setLoading] = React.useState<boolean>(false)

    async function onSubmit(data: CustomBeautyForm) {
        
    }

    return (
        <div
            className={cn("pb-6 md:pb-7 leading-7 text-sm text-gray-600")}
        >
            <h3 className="font-bold text-lg text-black">Custom order note </h3>
            <p className="my-5">Thank you for visiting our website. Fill the form if you want a custom made wig and our customer support will contact you soon for easy communication about your custom unit.</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-4">
                    <div className="w-full">
                        <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                            Cap Size
                        </label>

                        <select onChange={(e: any) => setCapSize(e.target.value)}
                            className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>


                    <div className="w-full">
                        <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                            Gram
                        </label>

                        <select onChange={(e: any) => setGram(e.target.value)}
                            className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12">
                            <option value="250g">200g</option>
                            <option value="300g">300g</option>
                            <option value="350g">350g</option>
                            <option value="400g">400g</option>
                        </select>
                    </div>


                    <div className="w-full">
                        <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                            Hair Texture
                        </label>

                        <select onChange={(e: any) => setHairTexture(e.target.value)}
                            className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12">
                            <option value="double drawn">Double Drawn</option>
                            <option value="super double drawn">Super Double Drawn</option>
                        </select>
                    </div>

                    
                    <div className="w-full">
                        <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                            Length inches
                        </label>

                        <select onChange={(e: any) => setLength(e.target.value)}
                            className="py-2 px-4 md:px-5 w-full 
						transition duration-150 
						ease-in-out border text-input text-xs lg:text-sm 
						font-body rounded-md placeholder-body min-h-12 
						transition duration-200 ease-in-out cursor-pointer
						bg-white border-gray-300 focus:outline-none 
						focus:border-heading h-11 md:h-12">
                            <option value={`8"`}>8"</option>
                            <option value={`10"`}>10"</option>
                            <option value={`12"`}>12"</option>
                            <option value={`14"`}>14"</option>
                            <option value={`16"`}>16"</option>
                            <option value={`18"`}>18"</option>
                            <option value={`20"`}>20"</option>
                            <option value={`22"`}>22"</option>
                            <option value={`24"`}>24"</option>
                            <option value={`26"`}>26"</option>
                            <option value={`28"`}>28"</option>
                            <option value={`30"`}>30"</option>
                        </select>
                    </div>
                    
                    
                    <Input
                        labelKey="Colour"
                        type="text"
                        variant="solid"
                        {...register("colour", {
                            required: "forms:colour-required",
                        })}
                        errorKey={errors.colour?.message}
                    />
                    <TextArea
                        labelKey="Additional Notes"
                        {...register("notes")}
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
    )
}

export default CustomBeautyOrder
