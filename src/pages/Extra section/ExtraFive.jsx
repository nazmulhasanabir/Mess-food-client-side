import chef1 from "../../assets/home/chef1.jpg";
import chef2 from "../../assets/home/chef2.jpg";
import chef3 from "../../assets/home/chef3.jpg";
import chef4 from "../../assets/home/chef4.jpg";

const ExtraFive = () => {
  const chefs = [
    {
      name: "Chef A",
      designation: "Head Chef",
      image: chef1,
    },
    {
      name: "Chef B",
      designation: "Sous Chef",
      image: chef2,
    },
    {
      name: "Chef C",
      designation: "Pastry Chef",
      image: chef3,
    },
    {
      name: "Chef D",
      designation: "Line Cook",
      image: chef4,
    },
  ];

  return (
    <div className="bg-red-50 py-12 text-center">
      <h2 className="text-4xl font-bold text-red-600">Our Mess Chefs</h2>
      <p className="text-gray-600 mt-2">Meet the masters behind our delicious meals</p>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-10 px-6">
        {chefs.map((chef, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={chef.image}
              alt={chef.name}
              className="w-32 h-32 mx-auto rounded-full border-4 border-red-500"
            />
            <h3 className="mt-4 text-xl font-semibold text-red-700">{chef.name}</h3>
            <p className="text-gray-500">{chef.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraFive;
