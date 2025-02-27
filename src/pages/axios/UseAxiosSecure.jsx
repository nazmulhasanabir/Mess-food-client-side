import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", 
});

const UseAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
  
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                // console.log("Request intercepted by axiosSecure");
                const token = localStorage.getItem("access-token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                // console.log("Request error:", error);
                return Promise.reject(error);
            }
        );


        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.status;
                // console.log("Response error status:", status);
                if (status === 401 || status === 403) {
                    await logout(); 
                    // navigate("/signIn"); 
                }
                return Promise.reject(error);
            }
        );

      
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, navigate]);

    return axiosSecure;
};

export default UseAxiosSecure;
