import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect } from "react";
import MealCart from "./MealCart/MealCart";
import MapCategory from "./MapCategory";

const CategoryTab = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      });
  }, []);
  const Breakfast = menu.filter((item) => item.category === "Breakfast");
  const Lunch = menu.filter((item) => item.category === "Lunch");
  const Dinner = menu.filter((item) => item.category === "Dinner");

  const [tabIndex, setTabindex] = useState(0);
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
