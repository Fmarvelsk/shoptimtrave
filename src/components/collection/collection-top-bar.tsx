import Text from "@components/ui/text";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface collectionItem {
  total?: number;
}
const CollectionTopBar = ({ total }: collectionItem) => {
  const { t } = useTranslation("common");
  const {
    query: { slug },
  } = useRouter();

  const collectionTitle = slug?.toString().split("-").join(" ");

  return (
    <div className="flex justify-between items-center mb-7">
      <Text
        variant="pageHeading"
        className="text-lg lg:inline-flex pb-1 capitalize"
      >
        {collectionTitle}
      </Text>
      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4">
          {total} {t("text-items")}
        </div>
      </div>
    </div>
  );
};

export default CollectionTopBar;
