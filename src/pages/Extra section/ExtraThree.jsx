import img1 from "../../assets/home/side-lamb-ragout-with-fried-onion-carrot-tomato-sauce-greens-vegetable-salad-table_141793-4744.avif"
import img2 from "../../assets/home/side-view-chicken-meatballs-with-greens-ketchup-plate_141793-4839.avif"
import img3 from "../../assets/home/left.jpg"
import { Link } from "react-router-dom";
const ExtraThree = () => {
    return (
        <div>
              <div className="  py-16 px-6 text-center relative">
      <p className="divider divider-error text-center text-3xl font-bold text-red-600">Explore by Our Cuisines</p>
      <div className="relative max-w-4xl mx-auto mt-8">
        {/* Left Image */}
        <img 
          src={img2}
          alt="Food Left"
          className="absolute -left-20 top-5 w-36 h-36 rounded-lg object-cover hidden md:block"
        />
        
        {/* Menu List */}
        <div className="space-y-8 text-xl md:text-2xl font-light">
          <p  className="border-t border-gray-500 py-4">BREAKFAST</p>
          <p className="border-t border-gray-500 py-4">LUNCH</p>
          <p className="border-t border-gray-500 py-4">DINNER</p>
          <p className="border-t border-b border-gray-500 py-4">
          SPECIAL ITEMS
        </p>
        </div>
        
        {/* Right Image */}
        <img 
          src={img1} 
          alt="Food Right"
          className="absolute -right-20 bottom-5 w-36 h-36 rounded-lg object-cover hidden md:block"
        />
        <img 
          src={img3} 
          alt="Food Right"
          className="absolute -left-20  w-36 h-36 rounded-lg object-cover hidden md:block"
        />
      </div>
      
      {/* Button */}
      <Link to={"/usermeal"}>
      <button className="mt-10 px-6 py-3 border border-gray-400 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition">
        View All Meals
      </button>
      </Link>
    </div>
        </div>
    );
};

export default ExtraThree;