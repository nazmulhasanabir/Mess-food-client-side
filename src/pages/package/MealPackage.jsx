import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
import { Link } from "react-router-dom";

const MealPackage = () => {
 
         const PackageFetch = async () => {
            const response = await fetch('http://localhost:5000/package')
            return response.json()
         }
         const {data :MealPackage = [], isLoading } = useQuery({
            queryKey:['package'],
            queryFn:PackageFetch,
         })

        const getBackgroundColor = (packageName) => {
            if (packageName === "Silver Package") return "bg-gray-300";
            if (packageName === "Gold Package") return "bg-yellow-400";
            if (packageName === "Platinum Package") return "bg-orange-100"; 
            return "bg-white"; 
          };
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
      <>
        <div className="mt-5">
            <div className="grid md:grid-cols-3 gap-10">
                {
                    MealPackage.map(item=>
                     <div className="p-6">
                        <div className={`p-16 rounded-3xl  ${getBackgroundColor(item.package_name)}`}>
                        <p className=' text-center text-2xl font-bold'>{item.package_name} </p>
                            <p className="text-center font-semibold">${item.price}</p>
                        </div>
                        <div className="border-2 rounded-xl text-center p-2 mt-2">
                                {
                                    item.facilities.map(facilities => <ul>
                                        <ol>{facilities}</ol>
                                        <div className="divider"></div>
                                    </ul>)
                                }
                      <Link to={`/package/${item._id}`}><button className="btn w-full mx-auto">Checkout</button></Link>
                        </div>
                    </div>)
}
            </div>
        </div>
      </>
    );
};

export default MealPackage;