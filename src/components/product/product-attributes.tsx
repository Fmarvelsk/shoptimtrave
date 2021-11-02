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
          >
            {title === "colours" ? (
              <span
                className="h-full w-full rounded block"
                style={{
                  backgroundColor:
                    value === "Purple"
                      ? "#8224e3"
                      : value === "Pink"
                      ? "#ffa5b4"
                      : value === "Orange"
                      ? "#e86c25"
                      : value === "Green"
                      ? "#008000"
                      : value === "Brown"
                      ? "#A52A2A"
                      : value === "Red"
                      ? "#dd3333"
                      : value === "Black"
                      ? "#000000"
                      : value === "Navy Blue" || value === "Blue"
                      ? "#0066CC"
                      : value === "Yellow"
                      ? "#FFFF00"
                      : value === "Gray" || value === "Grey"
                      ? "#808080"
                      : "#ffffff",
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
