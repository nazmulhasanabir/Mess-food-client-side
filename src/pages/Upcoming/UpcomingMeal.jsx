import { useQuery } from "@tanstack/react-query";
import { BiSolidLike } from "react-icons/bi";
import { Hourglass } from "react-loader-spinner";


const UpcomingMeal = () => {
    const AllMeal = async () => {
        const response = await fetch("https://hostel-manaegement-server-side.vercel.app/upcoming");
        return response.json();
      };
    
      const { data: upcoming = [], isLoading } = useQuery({
        queryKey: ["upcoming"],
        queryFn: AllMeal,
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
              <div className="grid md:grid-cols-2 gap-10">
            {upcoming.map((items) => (
                      <div>
                                <div className="hero bg-base-200 min-h-screen">
                      <div className=" ">
                        <img
                          src={items.image}
                          className="max-w-xl rounded-lg shadow-2xl" />
                        <div>
                          <h1 className="text-xl font-bold">{items.title}</h1>
                          <p className="py-6">{items.description}
                          </p>
                         
                          
                          <button className="btn btn-primary"><BiSolidLike /></button>
                          
                        </div>
                      </div>
                    </div>
                            </div>
            ))}
          </div>
        </div>
    );
};

export default UpcomingMeal;