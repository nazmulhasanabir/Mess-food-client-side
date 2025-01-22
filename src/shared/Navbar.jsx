import { Link } from 'react-router-dom';
import logo from '../assets/image/d3c6ebfd45e959318ad0935bcb1562cb.jpg'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';

const Navbar = () => {
  const {user} = useContext(AuthContext)
    const food = 
    <>
    <Link to={'/'}>
    
        <li>
            Home
        </li>
    </Link>
        <Link to={'/allMeal'}>
        <li>
            Meals
        </li>
        </Link>
        <Link to={'/upcoming'}>
        <li>
            Upcoming Meals
        </li>
        </Link>
        <Link to={'/signUp'}>
        <li>
            Join Us
        </li>
        </Link>
        <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </>
  return (
    <div>
      <div className="navbar bg-base-100  bg-opacity-60  text-black font-semibold max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content space-x-6 bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                {food}
            </ul>
          </div>
          <Link className='/'>
         <div className='flex items-center'>
         <img src={logo} className='rounded-full  w-16 h-16' />
         <a className="btn btn-ghost text-xl">Mess Food</a>
         </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">
        {food}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="">LogIn</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
