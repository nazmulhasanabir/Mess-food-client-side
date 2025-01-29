import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>    
            <Footer></Footer>
            <ScrollRestoration></ScrollRestoration>        
        </div>
    );
};

export default Main;