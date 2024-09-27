import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const Profile = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const { data: sms = [] } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const { data } = await axios.get(
        " http://52.74.26.144:9000/client/apiClient/list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return data;
    },
  });

  return (
    <div className="">
      <div className="">
        <div data-aos="" className="mt-8">
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
        <div
          data-aos="fade-down"
          id="product"
          className="flex flex-row flex-nowrap overflow-x-scroll scroll-smooth"
        >
          <div className=" container mx-auto mt-10 pb-20 overflow-x-auto md:overflow-hidden">
            <table className="table-auto border-collapse border-gray-200 w-full">
              <thead className="bg-purple-100 rounded py-24">
                <tr className="rounded">
                  <th className="text-start pl-4 py-5">SI</th>
                  <th className="text-start pl-4 py-5">Image</th>
                  <th className="text-start pl-4 py-5">Name</th>
                  <th className="text-start pl-4 py-5">Organization</th>
                  <th className="text-start pl-4 py-5">Email</th>
                  <th className="text-start pl-4 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white shadow-lg">
                {sms?.results?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border-b-[1px] px-4 py-6">{index +1}</td>
                    <td className="border-b-[1px] px-4 py-6">
                      <img
                        src="https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                    </td>
                    <td className="border-b-[1px] px-4 py-6">
                      {item.username}
                    </td>
                    <td className="border-b-[1px] px-4 py-6">
                      {item.organization}
                    </td>
                    <td className="border-b-[1px] px-4 py-6">{item.email}</td>{" "}
                    <td className="border-b-[1px] px-4 py-6">
                      {/* Replace with your action buttons */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
