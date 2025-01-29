import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
import MealCart from "./MealCart";
import InfiniteScroll from "react-infinite-scroll-component";

const AllMeal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Fetch meals with filters and search
  const fetchMeals = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `http://localhost:5000/meals?search=${searchTerm}&category=${category}&priceRange=${priceRange}&page=${pageParam}`
    );
    return response.json();
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["meals", searchTerm, category, priceRange],
    queryFn: fetchMeals,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : false),
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="flex flex-row justify-center items-center mb-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search meals"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* Filter Options */}
      <div className="flex justify-center gap-4 mb-4">
        <select
          className="select select-bordered"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <select
          className="select select-bordered"
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Select Price Range</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Infinite Scroll & Meal List */}
      <InfiniteScroll
        dataLength={data?.pages?.length || 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="flex justify-center">
            <Hourglass
              visible={true}
              height="40"
              width="40"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </div>
        }
      >
        <div className="grid md:grid-cols-3 gap-10">
          {data?.pages.map((page) =>
            page.meals.map((items) => (
              <MealCart key={items.id} items={items}></MealCart>
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllMeal;
