import CategoryTab from "../CategoryTab";
import ExtraFive from "../Extra section/ExtraFive";
import ExtraFour from "../Extra section/ExtraFour";
import ExtraOne from "../Extra section/ExtraOne";
import ExtraThree from "../Extra section/ExtraThree";
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
        <ExtraFive></ExtraFive>
        <ExtraThree></ExtraThree>
        <MealPackage></MealPackage>
        <ExtraTwo></ExtraTwo>
        <ExtraFour></ExtraFour>
    </div>
  );
};

export default Home;
