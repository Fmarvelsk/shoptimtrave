import React, { useState } from "react";
import cn from "classnames";
interface Props {
  className?: string;
  title: string;
  attributes?: [];
  active: string;
  onClick: any;
  isSelected?: any;
  cls?: boolean;
}

export const ProductAttributes: React.FC<Props> = ({
  className = "mb-4",
  title,
  attributes,
  active,
  onClick,
  isSelected,
  cls,
}) => {
  // @ts-ignore: Unreachable code error
  const [show, setShow] = useState(false);
  return (
    <div className={className}>
      <h3 className="text-base lg:text-lg text-heading font-semibold mb-2 capitalize">
        {title}
      </h3>
      <ul className="colors flex flex-wrap -me-3">
        {attributes?.map((value: any, id: number) => (
          <li
            key={`${value}-${id}`}
            className={`${cn(
              `cursor-pointer rounded border text-center border-gray-300 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex flex-wrap justify-center items-center text-heading text-xs font-semibold transition duration-200 ease-in-out hover:border-black`
            )} ${value === active && "border-black"}
            ${value.length < 4 || cls ? "w-9 md:w-11" : ""}
            `}
            onClick={() => {
              isSelected(true);
              onClick({ [title]: value }, title);
            }}
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            {cls ? (
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
