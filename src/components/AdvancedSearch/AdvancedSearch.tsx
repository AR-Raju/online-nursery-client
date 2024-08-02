/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useGetCategoriesQuery, useGetProductsQuery } from "@/redux/api/api";
import {
  setSearchQuery,
  setSortOrder,
  setSortTerm,
} from "@/redux/feature/productSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ICategory, IFilter, IProduct } from "@/types";
import { useDebounce } from "@/utils/useDebaunce";
import { Menu } from "lucide-react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Drawer } from "../ui/drawer";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import StarRating from "./StarRating";

const sortOptions = [
  { value: "priceHighToLow", label: "Price (high to low)" },
  { value: "priceLowToHigh", label: "Price (low to high)" },
  { value: "ratingHighToLow", label: "Rating (high to low)" },
  { value: "ratingLowToHigh", label: "Rating (low to high)" },
];

const AdvancedProductSearch = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortTerm, sortOrder, filters } = useAppSelector(
    (state: RootState) => state.products
  );
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({ searchQuery, filters, sortTerm, sortOrder });
  const { data: categories } = useGetCategoriesQuery(undefined);

  // Local state for search input
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounce the local search query
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Use effect to update Redux state when debounced value changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch, sortOrder, sortTerm]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handler for search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const [localFilters, setLocalFilters] = useState<IFilter>({
    minPrice: 0,
    maxPrice: 1000,
    categories: [],
    minRating: 0,
  });

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "minRating") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setLocalFilters((prev) => ({ ...prev, [key]: numValue }));
      }
    } else {
      setLocalFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const applyFilters = (filters: typeof localFilters) => {
    // Implement your filter application logic here
    console.log("Applying filters:", filters);
  };

  const resetFilters = () => {
    setLocalFilters({
      minPrice: 0,
      maxPrice: 1000,
      categories: [],
      minRating: 1,
    });
  };

  const handleSortChange = (value: string) => {
    console.log("ki pelam", value);
    const sortValue = value;
    const sortMappings: Record<
      string,
      { sortTerm: "price" | "rating"; sortOrder: "asc" | "desc" }
    > = {
      priceHighToLow: { sortTerm: "price", sortOrder: "desc" },
      priceLowToHigh: { sortTerm: "price", sortOrder: "asc" },
      ratingLowToHigh: { sortTerm: "rating", sortOrder: "asc" },
      ratingHighToLow: { sortTerm: "rating", sortOrder: "desc" },
    };

    if (sortMappings[sortValue]) {
      const { sortTerm, sortOrder } = sortMappings[sortValue];
      dispatch(setSortOrder(sortOrder));
      dispatch(setSortTerm(sortTerm));
    }
  };

  const renderFilters = () => (
    <div className="w-full max-w-[300px] p-5 space-y-6">
      <h4 className="text-xl font-medium mb-4">Filters</h4>
      <div>
        <h5 className="font-medium mb-2">Price Range</h5>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={[localFilters.minPrice || 0, localFilters.maxPrice || 1000]}
          onValueChange={(value: number[]) => {
            handleFilterChange("minPrice", value[0]);
            handleFilterChange("maxPrice", value[1]);
          }}
        />
        <div className="flex justify-between mt-2">
          <span>${localFilters.minPrice || 0}</span>
          <span>${localFilters.maxPrice || 1000}</span>
        </div>
      </div>
      <div>
        <h5 className="font-medium mb-2">Categories</h5>
        {categories?.data?.map((category: ICategory) => (
          <div key={category._id} className="flex items-center space-x-2">
            <Checkbox
              id={category._id}
              checked={localFilters.categories.includes(category.name) || false}
              onCheckedChange={(checked: boolean) => {
                const newCategories = checked
                  ? [...(localFilters.categories || []), category.name]
                  : localFilters.categories?.filter(
                      (c: string) => c !== category.name
                    );
                handleFilterChange("categories", newCategories);
              }}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
      </div>
      <div>
        <h5 className="font-medium mb-2">Minimum Rating</h5>
        <StarRating
          value={localFilters.minRating || 0}
          onChange={(value) => handleFilterChange("minRating", value)}
        />
      </div>
      <Button
        onClick={() => applyFilters(localFilters)}
        className="w-full bg-nursery-primary hover:bg-nursery-primary"
      >
        Apply Filters
      </Button>
    </div>
  );
  console.log("localfilters", localFilters);
  //   console.table({ sortTerm, sortOrder });
  //   console.log({ categories });

  return (
    <div className="container mx-auto px-4 lg:px-16 py-8">
      <div className="relative mb-8">
        <Input
          value={localSearchQuery}
          onChange={handleSearchChange}
          className="pr-24 h-16 rounded-full"
          placeholder="Search products..."
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mt-4 md:mt-0 flex items-center">
          <Button
            variant="link"
            onClick={resetFilters}
            className="text-primary underline mr-4"
          >
            Reset Filters
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          {/* <div className="hidden md:block">{renderFilters()}</div> */}
          <Drawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            {renderFilters()}
          </Drawer>
        </div>

        <div className="md:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-lg">
              {searchQuery && `Search Results for "${searchQuery}"`}
            </p>
            {/* <select
              value={sortTerm}
              onChange={(value) => handleSortChange(value)}
            >
              {sortOptions.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select> */}
            <Select onValueChange={(value) => handleSortChange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>sort</SelectLabel>
                  {sortOptions.map((item) => (
                    <SelectItem key={item.label} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.toString()}</p>}

          {!isLoading && products?.data?.length === 0 && (
            <div className="flex flex-col items-center my-16">
              <p className="text-2xl font-semibold text-center">
                No products found matching your criteria
              </p>
            </div>
          )}

          {!isLoading && products?.data?.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.data?.map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
};

export default AdvancedProductSearch;
