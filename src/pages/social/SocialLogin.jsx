import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../axios/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()
    const badge = 'Bronze'
    const {googleLogin}= useContext(AuthContext)
    const handleGoogle = () => {
        googleLogin()
        .then(result => {
            console.log(result.user)
            const userInfo = {
                email:result.user?.email,
                name:result.user?.displayName,
                photo:result.user?.photoURL,
                badge:badge

            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
               if(res.data){
                Swal.fire({
                    // position: "top-center",
                    icon: "success",
                    title: "Google SignIn Success",
                    showConfirmButton: false,
                    timer: 1500
                  });
               }
                navigate('/')
            })
        })
    }
    return (
        <div className="p-8">
                    <div className="divider"></div>
                    <div>
                        <button onClick={handleGoogle} className="btn">
                        <FaGoogle className="mr-2"></FaGoogle>
                            Google
                        </button>
                    </div>
        </div>
    );
};

export default SocialLogin;