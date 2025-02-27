import React from "react";
import { FaUtensils, FaUsers } from "react-icons/fa";

const ExtraTwo = () => {
  return (
    <div className="bg-white py-12 px-6 text-center">
      <div className="divider divider-error text-center text-3xl font-bold text-red-600">
        Share Mess Food with Friends
      </div>
      <p className="text-gray-500 mt-2 mb-8 max-w-2xl mx-auto">
        Good food is meant to be shared! Invite your friends to enjoy fresh, home-style meals at our Mess.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Card 1 - Join Mess Food */}
        <div className="bg-gray-100 shadow-lg rounded-2xl p-8 flex flex-col items-center">
          <div className="bg-white rounded-full p-6 shadow-md">
            <FaUtensils className="text-green-500 text-5xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 font-serif mt-4">
            Join Our Mess
          </h3>
          <p className="text-gray-500 mt-2 text-center">
            Enjoy affordable, delicious, and home-style meals every day.
          </p>
        </div>

        {/* Card 2 - Invite Friends */}
        <div className="bg-gray-100 shadow-lg rounded-2xl p-8 flex flex-col items-center">
          <div className="bg-white rounded-full p-6 shadow-md">
            <FaUsers className="text-green-500 text-5xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 font-serif mt-4">
            Invite Friends
          </h3>
          <p className="text-gray-500 mt-2 text-center">
            Share the goodness! Let your friends know about our tasty mess food.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraTwo;
