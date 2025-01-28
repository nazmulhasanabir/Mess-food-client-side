import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://hostel-manaegement-server-side.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;