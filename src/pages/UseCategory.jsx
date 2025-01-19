import { useEffect, useState } from "react"

const UseCategory = () => {
        const [menu , setMenu] = useState([])
        const [loading , setLoading] = useState(true)
        useEffect(()=>{
            fetch('category.json')
            .then(res => res.json())
            .then(data =>
            {
                setMenu(data)    
                setLoading(false)
            }
            )
        }, [])
        return [menu, loading]
}
export default UseCategory