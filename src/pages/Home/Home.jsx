import CategoryTab from "../CategoryTab";
import ExtraOne from "../Extra section/ExtraOne";
import ExtraTwo from "../Extra section/ExtraTwo";
import MealPackage from "../package/MealPackage";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <CategoryTab></CategoryTab>
        <ExtraOne></ExtraOne>
        <ExtraTwo></ExtraTwo>
        <MealPackage></MealPackage>
    </div>
  );
};

export default Home;
