import CategoryTab from "../CategoryTab";
import ExtraOne from "../Extra section/ExtraOne";
import ExtraTwo from "../Extra section/ExtraTwo";
import MealPackage from "../package/MealPackage";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <ExtraOne></ExtraOne>
        <div className="divider divider-error text-center text-3xl font-bold text-red-600">Meal Category</div>
        <CategoryTab></CategoryTab>
        <MealPackage></MealPackage>
        <ExtraTwo></ExtraTwo>
    </div>
  );
};

export default Home;
