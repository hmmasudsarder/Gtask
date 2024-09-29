import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import AreaChartsC from "../../components/share/AreaChartsC";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Dropdown, Menu, Space } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { BsThreeDots } from "react-icons/bs";

const data = [
  {
    name: "F",
    date: "2020",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    date: "2021",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "A",
    date: "2022",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "B",
    date: "2023",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "C",
    date: "2024",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "D",
    date: "2025",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const Dashboard = () => {
  const [params, setParams] = useSearchParams();
  const [barChartWidth, setBarChartWidth] = useState(400);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [organizationName, setOrganizationName] = useState(null);
  const [singleId, setSingleId] = useState(null);
  const token = localStorage.getItem("token");

  const { data: sms = [], refetch } = useQuery({
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

  const { data: singleDetails } = useQuery({
    queryKey: ["singleDetails", singleId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://52.74.26.144:9000/client/apiClient/${singleId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return data;
    },
    retry: 2,
    enabled: singleId ? true : false,
  });

  const checkState = params.get("currentState");
  // thsi for barchart width manuali
  useEffect(() => {
    if (checkState === "true" && "null") {
      setBarChartWidth(400);
    } else {
      setBarChartWidth(320);
    }
  }, [checkState]);

  // Force re-render when checkState changes
  useEffect(() => {
    setParams({ currentState: checkState });
  }, [checkState, setParams]);
  if (!token) {
    return navigate("/login");
  }

 

  // handle Email
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  
  // handle username
  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  // handle organization
  const handleOrganizationChange = (e) => {
    setOrganizationName(e.target.value);
  };

  // handle edit user
  const handleEditClick = async (itemId) => {
    setSingleId(itemId);
    const email = userEmail || singleDetails?.email;
    const username = userName || singleDetails?.name;
    const organization = organizationName || singleDetails?.organization;
    const postData = {
      email: email,
      username: username,
      organization: organization,
    };
    await axios
      .patch(
        `http://52.74.26.144:9000/client/apiClient/${itemId}/`, // Now using '/api' which will be proxied
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // Use "Bearer" if your API expects it
          },
        }
      )
      .then((data) => {
        console.log("Data sent successfully", data);
        navigate("/");
        refetch();
      })
      .catch((error) => {
        console.log("Error sending data", error);
      });
  };

  // handle delete 
  const handleDeletClick = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://52.74.26.144:9000/client/apiClient/${itemId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // Use "Bearer" if your API expects it
          },
        }
      );

      console.log(response.data);
      refetch();
    } catch (error) {
      console.error(error);
      alert("Failed to fetch single data");
    }
  };

  return (
    // change some margin left side for full divise
    <div className=" bg-gray-50">
      <div data-aos="fade-down" className="z-0">
        <div className="">
          <div className="">
            {/* title dashboard  */}
            <div className="">
              <h2 className="text-xl mt-4 mb-7">Dashboard</h2>
            </div>
            {/* dashboard card desing */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3 md:mx-auto">
              <div
                data-aos="fade-left"
                className="bg-gradient-to-r from-purple-400 to-violet-100 h-36 rounded-lg"
              >
                <div className="text-white text-center mt-5 space-y-1">
                  <h2 className="text-4xl font-semibold">Weekly Sales</h2>
                  <p className="">$ 500000</p>
                  <p className="">Increase by 30%</p>
                </div>
              </div>
              <div
                data-aos="fade-up"
                className="bg-gradient-to-r from-violet-400 to-violet-100 h-36 rounded-lg"
              >
                <div className="text-white text-center mt-5 space-y-1">
                  <h2 className="text-4xl font-semibold">Monthly Sales</h2>
                  <p className="">$ 500000</p>
                  <p className="">Increase by 20%</p>
                </div>
              </div>
              <div
                data-aos="fade-left"
                className="bg-gradient-to-r from-purple-400 to-violet-100 h-36 rounded-lg"
              >
                <div className="text-white text-center mt-5 space-y-1">
                  <h2 className="text-4xl font-semibold">Yearly Sales</h2>
                  <p className="">$ 500000</p>
                  <p className="">Increase by 10%</p>
                </div>
              </div>
            </div>
            {/* chart bar staart here  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
              <div className="bg-white rounded-md h-full md:h-[65vh] mx-3 md:mx-auto">
                <AreaChartsC />
              </div>
              <div className="bg-white ml-0 xl:ml-1 rounded-md h-full md:h-[65vh] mx-3 md:mx-auto">
                <BarChart
                  width={barChartWidth}
                  height={360}
                  data={data}
                  margin={{
                    top: 40,
                    right: 5,
                    left: -5,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="pv" fill="#827EF5" />
                  <Bar dataKey="uv" fill="#9A54F8" />
                </BarChart>
              </div>
              <div className="bg-white rounded-md h-full md:h-[65vh] mx-3 md:mx-auto">
                <AreaChartsC />
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
                        <td className="border-b-[1px] px-4 py-6">
                          {index + 1}
                        </td>
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
                        <td className="border-b-[1px] px-4 py-6">
                          {item.email}
                        </td>{" "}
                        <td className="border-b-[1px] px-4 py-6">
                          {/* Replace with your action buttons */}
                          {/* Dropdown menu */}
                          <Dropdown
                            overlay={
                              <Menu>
                                <MenuItem
                                  key="1"
                                  icon={<EditOutlined />}
                                  onClick={() => {
                                    document
                                      .getElementById(`my_modal_${item?.id}`)
                                      .showModal();
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  key="2"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleDeletClick(item.id)}
                                >
                                  Delete
                                </MenuItem>
                              </Menu>
                            }
                            placement="bottomCenter"
                          >
                            <a>
                              <Space>
                                <BsThreeDots />
                              </Space>
                            </a>
                          </Dropdown>
                          <dialog
                            id={`my_modal_${item?.id}`}
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <div
                                // onSubmit={handleSubmit}
                                className="space-y-6 ng-untouched ng-pristine ng-valid"
                              >
                                <h2 className="text-xl text-center font-bold">
                                  Edit Client
                                </h2>
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="block mb-2 text-sm"
                                    >
                                      Enter Your Office Email
                                    </label>
                                    <input
                                      onChange={handleEmailChange}
                                      name="email"
                                      defaultValue={item?.email}
                                      type="email"
                                      placeholder="Enter Your Email"
                                      id="email"
                                      required
                                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                                      data-temp-mail-org="0"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="username"
                                      className="block mb-2 text-sm"
                                    >
                                      Enter Your Name
                                    </label>
                                    <input
                                      onChange={handleUsernameChange}
                                      name="username"
                                      defaultValue={item?.username}
                                      type="text"
                                      placeholder="Enter Your Name"
                                      id="username"
                                      required
                                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                                      data-temp-mail-org="0"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="organization"
                                      className="block mb-2 text-sm"
                                    >
                                      Enter Your Office Name
                                    </label>
                                    <input
                                      onChange={handleOrganizationChange}
                                      name="organization"
                                      defaultValue={item?.organization}
                                      type="text"
                                      placeholder="Enter Your Office Name"
                                      id="organization"
                                      required
                                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                                      data-temp-mail-org="0"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <button
                                    onClick={() => handleEditClick(item?.id)}
                                    className="bg-primary w-full rounded-md py-3 text-white"
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                              <div className="modal-action">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    X
                                  </button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
