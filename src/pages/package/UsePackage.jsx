import { useEffect, useState } from "react";

const UsePackage = () => {
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
    return [MealPackage, loading]
};

export default UsePackage;