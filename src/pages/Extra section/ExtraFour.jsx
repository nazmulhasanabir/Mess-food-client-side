
const ExtraFour = () => {
    return (
        <div>
               <div className="bg-red-700 py-12 px-6 text-center text-white">
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          🍽️ Subscribe for Delicious Meal Updates!
        </h2>
        <p className=" mt-3">
          Get daily or weekly meal menus, exclusive offers, and mess updates directly in your inbox.
        </p>

        {/* Subscription Form */}
        <div className="mt-6 flex flex-col md:flex-row items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default ExtraFour;