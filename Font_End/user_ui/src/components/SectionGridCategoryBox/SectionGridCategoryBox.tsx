import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";
import React from "react";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Ha Giang",
    taxonomy: "category",
    count: 182,
    thumbnail:
      "https://nld.mediacdn.vn/291774122806476800/2021/9/10/hagiang-nld-3-1631246603578128307665.jpg",
  },
  {
    id: "2",
    href: "#",
    name: "Cao Bang",
    taxonomy: "category",
    count: 288,
    thumbnail:
      "https://iv.vnecdn.net/dulich/images/web/2021/07/08/non-nuoc-cao-bang-1625735422.jpg",
  },
  {
    id: "2",
    href: "#",
    name: "Lao Cai",
    taxonomy: "category",
    count: 128,
    thumbnail:
      "https://btnmt.1cdn.vn/2017/10/21/images2037073_nhat.jpg",
  },
  {
    id: "2",
    href: "#",
    name: "Quang Ninh",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://file1.dangcongsan.vn/DATA/0/2019/05/vinhhalong3-15_23_29_730.jpg",
  },
  {
    id: "2",
    href: "#",
    name: "Da Nang",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://disantrangan.vn/wp-content/uploads/2021/02/tour-da-nang.jpg",
  },
  {
    id: "2",
    href: "#",
    name: "Da Lat",
    taxonomy: "category",
    count: 223,
    thumbnail:
      "https://lamdong.gov.vn/sites/snnptnt/gioithieu/dautulamdong/SiteAssets/SitePages/Anh-dep-Da-Lat/73208-canh-dep-da-lat-1570724101-85PJt.jpg",
  },
  {
    id: "11",
    href: "#",
    name: "Ca Mau",
    taxonomy: "category",
    count: 175,
    thumbnail:
      "https://vcdn1-dulich.vnecdn.net/2022/04/06/dulichCaMau01-1649220925-3009-1649240147.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=__uuV0wfll0lZgX01LNRsA",
  },
  {
    id: "222",
    href: "#",
    name: "Kien Giang",
    taxonomy: "category",
    count: 128,
    thumbnail:
      "https://kiengiang.gov.vn/PublishingImages/TinTuc/DuLich/6-2-rach_gia_ve_dem.jpg",
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover local treasures hidden gems in Vietnam."
        isCenter={headingCenter}
      >
        Adventure Awaits
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
          <CardComponentName key={i} taxonomy={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
