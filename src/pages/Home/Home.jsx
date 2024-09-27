import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div data-aos="fade-down" className="mt-8">
      <div className="space-y-2">
        <h1 className="text-xl">Home Page</h1>
        <p className="text-primary">Home</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-xl flex items-center justify-between gap-4">
          All Product List
        </h2>
        <button className="bg-primary flex items-center px-4 py-2 gap-4 rounded text-white">
          <FaPlus className="text-white" /> Add
        </button>
      </div>
    </div>
  );
};

export default Home;
