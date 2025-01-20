import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MapCategory from "./MapCategory";
import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";

const CategoryTab = () => {
  const fetchMeals = async () => {
    const response = await fetch("http://localhost:5000/meals");
    return response.json();
  };

  const { data: menu = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });

  const Breakfast = menu.filter((item) => item.category === "Breakfast");
  const Lunch = menu.filter((item) => item.category === "Lunch");
  const Dinner = menu.filter((item) => item.category === "Dinner");

  const [tabIndex, setTabindex] = useState(0);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
