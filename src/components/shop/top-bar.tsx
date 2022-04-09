import Text from "@components/ui/text";
import { useTranslation } from "next-i18next";

interface totalItem {
  total?: number;
}
const SearchTopBar = ({ total }: totalItem) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-between items-center mb-7">
      <Text variant="pageHeading" className="text-lg lg:inline-flex pb-1">
        {t("All product")}
      </Text>

      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 lg:block">
          {total} {t("text-items")}
        </div>
      </div>
    </div>
  );
};

export default SearchTopBar;
