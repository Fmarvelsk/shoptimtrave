import React, { useState } from "react";
import cn from "classnames";
interface Props {
  className?: string;
  title: string;
  attributes?: [];
  active: string;
  onClick: any;
  isSelected?: any;
}

export const ProductAttributes: React.FC<Props> = ({
  className = "mb-4",
  title,
  attributes,
  active,
  onClick,
  isSelected,
}) => {

    // @ts-ignore: Unreachable code error
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
        {title}
      </h3>
      <ul className="colors flex flex-wrap -me-3">
        {attributes?.map((value, id) => (
          <li
            key={`${value}-${id}`}
            className={`${cn(
              "cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black"
            )} ${value === active && "border-black"}`}
            onClick={() => {
              isSelected(true);
              onClick({ [title]: value });
            }}
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            {title === "colours" ? (
              <span
                className="h-full w-full rounded block"
                style={{
                  backgroundColor: value,
                }}
              />
            ) : (
              value
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
