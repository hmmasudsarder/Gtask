import { useEffect, useState } from "react";

const Profile = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    // Replace this with your actual image processing logic
    // For demonstration, I'll use a hardcoded array
    const data = [
      { SI: 1, Name: "JohnDoe1", Category: "Web Development", Gender: "male" },
      {
        SI: 2,
        Name: "JohnDoe2",
        Category: "Mobile App Development",
        Gender: "female",
      },
      { SI: 3, Name: "JohnDoe3", Category: "Web Development", Gender: "male" },
      { SI: 4, Name: "JohnDoe4", Category: "UI/UX Design", Gender: "female" },
    ];
    setTableData(data);
  }, []);
  return (
    <div
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
              <th className="text-start pl-4 py-5">Category</th>
              <th className="text-start pl-4 py-5">Gender</th>
              <th className="text-start pl-4 py-5">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white shadow-lg">
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border-b-[1px] px-4 py-6">{item.SI}</td>
                <td className="border-b-[1px] px-4 py-6">
                  <img
                    src="https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </td>
                <td className="border-b-[1px] px-4 py-6">{item.Name}</td>
                <td className="border-b-[1px] px-4 py-6">{item.Category}</td>
                <td className="border-b-[1px] px-4 py-6">{item.Gender}</td>  
                <td className="border-b-[1px] px-4 py-6">
                  {/* Replace with your action buttons */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
