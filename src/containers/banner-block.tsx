import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
interface BannerProps {
  data: any;
  className?: string;
}
/**grid-cols-2 */
const BannerBlock: React.FC<BannerProps> = ({
  data,
  className = "mb-12 md:mb-14 xl:mb-16",
}) => {
  return (
    <div
      className={`${className} px-2.5 grid md:h-auto sm:h-48 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto`}
    >
      {data.map((banner: any) => (
        <BannerCard
          key={`banner--key${banner.id}`}
          banner={banner}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          effectActive={true}
          variant="default"
          className={"col-span-1 banner sm:col-span-2"}
        />
      ))}
    </div>
  );
};

export default BannerBlock;
