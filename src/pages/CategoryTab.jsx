import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MapCategory from "./MapCategory";
import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
const CategoryTab = () => {
  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:5000/meals");
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error("Error fetching meals:", error);
      return [];
    }
  };
  const { data: menu = [], isLoading, error } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
  const Breakfast = menu?.filter((item) => item.category === "Breakfast") ;
  const Lunch = menu?.filter((item) => item.category === "Lunch") ;
  const Dinner = menu?.filter((item) => item.category === "Dinner") ;
  const [tabIndex, setTabindex] = useState(0);
  if (error) {
    return <div>Error loading meals: {error.message}</div>;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306CCE", "#72A1ED"]}
        />
      </div>
    );
  }
  console.log();
  return (
    <div className="p-6">
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabindex(index)}>
        <TabList>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab>All Meals</Tab>
        </TabList>
        <TabPanel>
          <MapCategory item={Breakfast}></MapCategory>
        </TabPanel>
        <TabPanel>
          <MapCategory item={Lunch}></MapCategory>
        </TabPanel>
        <TabPanel>
          <MapCategory item={Dinner}></MapCategory>
        </TabPanel>
        <TabPanel>
          <MapCategory item={menu}></MapCategory>
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default CategoryTab;