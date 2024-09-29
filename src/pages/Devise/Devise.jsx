import { useQuery } from "@tanstack/react-query";
import { Dropdown, Menu, Space } from "antd";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Devise = () => {
  const [pass, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [deviseN, setOrganizationName] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: sms = [], refetch } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://52.74.26.144:9000/device/devices/list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return data;
    },
  });

  // get single data
  // console.log(singleDetails);
  const handleDeletClick = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://52.74.26.144:9000/device/devices/${itemId}/`,
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

  // handle email
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
    const password = pass;
    const username = userName;
    const deviceName = deviseN;
    const postData = {
      password: password,
      username: username,
      deviceName: deviceName,
    };
    await axios
      .patch(
        `http://52.74.26.144:9000/device/devices/${itemId}/`, // Now using '/api' which will be proxied
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

  // handle post user
  const handlePost = async () => {
    const password = pass;
    const username = userName;
    const deviceName = deviseN;
    const postData = {
      password: password,
      username: username,
      deviceName: deviceName,
    };
    await axios
      .post(
        "http://52.74.26.144:9000/device/devices/create/", // Now using '/api' which will be proxied
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
      })
      .catch((error) => {
        console.log("Error sending data", error);
      });
  };
  if (!token) {
    return navigate("/login");
  }
  return (
    <div className="">
      <div className="">
        <div data-aos="" className="mt-8">
          <div className="space-y-2">
            <h1 className="text-xl">Devise Page</h1>
            <p className="text-primary">Devise</p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h2 className="text-xl flex items-center justify-between gap-4">
              All Devise List
            </h2>
            <button
              className="bg-primary flex items-center px-4 py-2 gap-4 rounded text-white"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaPlus className="text-white" /> Add
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <div
                  // onSubmit={handleSubmit}
                  className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                  <h2 className="text-xl text-center font-bold">
                    Added Devise
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="deviceName"
                        className="block mb-2 text-sm"
                      >
                        Enter Your Devise Name
                      </label>
                      <input
                        onChange={handleEmailChange}
                        name="deviceName"
                        type="text"
                        placeholder="Enter Your Email"
                        id="deviceName"
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="username" className="block mb-2 text-sm">
                        Edit Your Name
                      </label>
                      <input
                        onChange={handleUsernameChange}
                        name="username"
                        type="text"
                        placeholder="Enter Your Name"
                        id="username"
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm">
                        Enter Your Password
                      </label>
                      <input
                        onChange={handleOrganizationChange}
                        name="password"
                        type="text"
                        placeholder="Enter Your Office Name"
                        id="password"
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handlePost}
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
                  <th className="text-start pl-4 py-5">password</th>
                  <th className="text-start pl-4 py-5">deviceName</th>
                  <th className="text-start pl-4 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white shadow-lg">
                {sms?.results?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border-b-[1px] px-4 py-6">{index + 1}</td>
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
                      {item.deviceName}
                    </td>
                    <td className="border-b-[1px] px-4 py-6">
                      {item.password}
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
                              Edit User Histry
                            </h2>
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="deviceName"
                                  className="block mb-2 text-sm"
                                >
                                  Edit Password
                                </label>
                                <input
                                  onChange={handleEmailChange}
                                  name="deviceName"
                                  defaultValue={item?.deviceName}
                                  type="text"
                                  placeholder="Enter Your Email"
                                  id="deviceName"
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
                                  Edit Your Name
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
                                  htmlFor="password"
                                  className="block mb-2 text-sm"
                                >
                                  Edit Your Divise Name
                                </label>
                                <input
                                  onChange={handleOrganizationChange}
                                  name="password"
                                  defaultValue={item?.password}
                                  type="text"
                                  placeholder="Enter Your Office Name"
                                  id="password"
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
  );
};

export default Devise;
