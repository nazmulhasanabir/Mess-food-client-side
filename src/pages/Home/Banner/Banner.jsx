import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/home/01.jpg";
import img2 from "../../../assets/home/02.jpg";
import img3 from "../../../assets/home/03.png";



const Banner = () => {
  return (
   <>
    <Carousel>
      <div>
        <img  src={img1} />
      </div>
      <div>
        <img  src={img2} />
      </div>
      <div>
        <img  src={img3} />
      </div>
    
    </Carousel>
    <div className="divider divider-error text-center text-3xl font-bold text-red-600">Meal Category</div>
   </>
  );
};

export default Banner;
