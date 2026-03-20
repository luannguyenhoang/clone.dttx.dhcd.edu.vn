import { toSlug } from "@/utils/toSlug";
import { CategoryCard } from "@/app/components/atoms/CategoryCard";
import { DEFAULT_CATEGORY_DATA } from "@/data/DefaultData";

export const CategoryGrid = ({ data }: { data?: any }) => {
  const categoryData = data || DEFAULT_CATEGORY_DATA;

  if (!categoryData || !categoryData.industrygroups) {
    return null;
  }

  return (
    <div className="w-full py-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-medium text-[#002147] mb-10">
          {categoryData.title || "Các Ngành Nổi Bật"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryData.industrygroups.map((category: any, index: any) => (
            <CategoryCard
              key={index}
              title={category.industryname}
              image={category.image.node.mediaItemUrl}
              href={`/nganh-dao-tao/${toSlug(category.industryname)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
