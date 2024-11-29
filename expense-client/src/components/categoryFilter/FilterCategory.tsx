import { useQuery, useQueryClient } from "@tanstack/react-query";
import TableFilter from "./TableFilter";
import axios from "axios";
import { Category } from "@/utils/CategoryType";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const FilterCategory = () => {
  const [category, setCategory] = useState("Food");
  const { data, isError, isFetched, isFetching, isLoading, isSuccess } =
    useQuery({
      queryKey: ["category"],
      queryFn: async () => {
        const res = await axios.get("http://localhost:8080/category");
        const data = res.data as Category;

        return data.result;
      },
    });

  const handleCategoryClick = async (category: string) => {
    setCategory(category);
  };

  if (isFetched && isSuccess) {
    return (
      <>
        <div className="md:ml-[15%] h-screen space-y-7 md:p-10 p-4">
          <div className="text-3xl font-bold">All Categories</div>
          <div className="grid md:grid-cols-7 grid-cols-3 md:gap-5 gap-2">
            {data?.map((item) => (
              <Button
                disableRipple
                radius="none"
                onClick={() => handleCategoryClick(item.categoryName)}
                key={item.uid}
                className={`${
                  category === item.categoryName
                    ? "border-primary text-lg bg-transparent border-b-2"
                    : "bg-transparent text-lg"
                } w-full flex justify-start`}
              >
                {item.categoryName}
              </Button>
            ))}
          </div>
          <TableFilter info={category} />
        </div>
      </>
    );
  }
};

export default FilterCategory;
