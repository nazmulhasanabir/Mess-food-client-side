import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/home/gallery2.jpg";
import img2 from "../../../assets/home/02.jpg";
import img3 from "../../../assets/home/03.png";



const Banner = () => {
  return (
   <>
    <Carousel>
      <div>
        <img  className="rounded-b-3xl" src={img1} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-9xl font-bold h-full w-full bg-gray-900/50 rounded-3xl py-5 ">MESS FOOD</h1>
        </div>
      </div>
      <div>
        <img className="rounded-b-3xl" src={img2} />
      </div>
      <div>
        <img className="rounded-b-3xl" src={img3} />
      </div>
    
    </Carousel>
    
   </>
  );
};

export default Banner;
