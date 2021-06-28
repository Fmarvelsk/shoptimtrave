import React from "react";
import { useTranslation } from "next-i18next";
import { useCollectionsQuery } from "@framework/collection/get-all-collection";
import ActiveLink from "@components/ui/active-link";
import { ROUTES } from "@utils/routes";

export const CollectionFilters: React.FC = () => {
	const { t } = useTranslation("common");
	const { data, isLoading } = useCollectionsQuery({
		limit: 15,
	});
	if (isLoading) return <p>Loading...</p>;

	const items = data?.collections.data;
	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-5 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						{t("text-collection-list")}
					</h2>
				</div>
			</div>
			<div className="block pb-7">
				<ul className="mt-2 flex flex-col space-y-5">
					{items?.map((item: any) => (
						<li key={item.id} className="text-sm lg:text-[15px] cursor-pointer">
							<ActiveLink href={`${ROUTES.COLLECTIONS}/${item.slug}`}>
								<a className="block transition duration-300 ease-in-out text-heading hover:font-semibold py-0.5">
									{item.name}
								</a>
							</ActiveLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
