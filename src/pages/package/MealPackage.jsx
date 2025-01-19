import { useEffect, useState } from "react";

const MealPackage = () => {
      const [MealPackage, setPackage] = useState([])
        const [loading,setLoading ] = useState(true)
        useEffect(()=> {
            fetch('mealPackage.json')
            .then(res => res.json())
            .then(data =>{
                setPackage(data)
                setLoading(false)
            })
        }, [])
        const getBackgroundColor = (packageName) => {
            if (packageName === "Silver Package") return "bg-gray-300";
            if (packageName === "Gold Package") return "bg-yellow-400";
            if (packageName === "Platinum Package") return "bg-orange-100"; 
            return "bg-white"; 
          };
        
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
                        <button className="btn w-full mx-auto">Checkout</button>
                        </div>
                    </div>)
}
            </div>
        </div>
      </>
    );
};

export default MealPackage;