import React from "react";
import { FaUser, FaBirthdayCake } from "react-icons/fa";

const ExtraTwo = () => {
  return (
    <div className="bg-white py-12 px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-900 font-serif">Share with Friends</h2>
    <p className="text-gray-500 mt-2 mb-8 max-w-2xl mx-auto">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Card 1 */}
      <div className="bg-gray-100 shadow-lg rounded-2xl p-8 flex flex-col items-center">
        <div className="bg-white rounded-full p-6 shadow-md">
          <FaUser className="text-green-500 text-5xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 font-serif mt-4">Create a Profile</h3>
        <p className="text-gray-500 mt-2 text-center">
          eniam, quis nostrud exer citation ullamco laboris nisi.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-gray-100 shadow-lg rounded-2xl p-8 flex flex-col items-center">
        <div className="bg-white rounded-full p-6 shadow-md">
          <FaBirthdayCake className="text-green-500 text-5xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 font-serif mt-4">Find Friends</h3>
        <p className="text-gray-500 mt-2 text-center">
          eniam, quis nostrud exer citation ullamco laboris nisi.
        </p>
      </div>
    </div>
  </div>
  );
};

export default ExtraTwo;
