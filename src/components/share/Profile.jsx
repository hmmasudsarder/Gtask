import { useQuery } from "@tanstack/react-query";
import { Dropdown, Menu, Space } from "antd";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [organizationName, setOrganizationName] = useState(null);
  const navigate = useNavigate();
  const [singleId, setSingleId] = useState(null);
  const token = localStorage.getItem("token");

  const { data: sms = [], refetch } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://52.74.26.144:9000/client/apiClient/list/",
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
  // get single data
  // console.log(singleDetails);
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
        `http://52.74.26.144:9000/client/apiClient/${itemId}/`, 
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, 
          },
        }
      )
      .then((data) => {
        console.log("Data sent successfully", data);
        navigate("/product");
        refetch();
      })
      .catch((error) => {
        console.log("Error sending data", error);
      });
  };

  // handle post user
  const handlePost = async () => {
    const email = userEmail;
    const username = userName;
    const organization = organizationName;
    const postData = {
      email: email,
      username: username,
      organization: organization,
    };
    console.log(postData);
    await axios
      .post(
        "http://52.74.26.144:9000/client/apiClient/create/", // Now using '/api' which will be proxied
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
        navigate("/product");
        refetch();
        alert("data send Successfully", data)
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
            <h1 className="text-xl">Profile Page</h1>
            <p className="text-primary">Profile</p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h2 className="text-xl flex items-center justify-between gap-4">
              All Product List
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
                  <h2 className="text-xl text-primary">Add User</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">
                        Enter Your Office Email
                      </label>
                      <input
                        onChange={handleEmailChange}
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        id="email"
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="username" className="block mb-2 text-sm">
                        Enter Your Name
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
                      <label
                        htmlFor="organization"
                        className="block mb-2 text-sm"
                      >
                        Enter Your Office Name
                      </label>
                      <input
                        onChange={handleOrganizationChange}
                        name="organization"
                        type="text"
                        placeholder="Enter Your Office Name"
                        id="organization"
                        required
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button
                        onClick={handlePost}
                        method="dialog"
                        className="bg-primary w-11/12 rounded-md py-3 text-white absolute left-5 bottom-2"
                      >
                        Update
                      </button>
                    </form>
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
                  <th className="text-start pl-4 py-5">Organization</th>
                  <th className="text-start pl-4 py-5">Email</th>
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
                      {item.organization}
                    </td>
                    <td className="border-b-[1px] px-4 py-6">{item.email}</td>{" "}
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
                            <div className="modal-action">
                              <form method="dialog">
                                <button
                                  onClick={() => handleEditClick(item?.id)}
                                  method="dialog"
                                  className="bg-primary w-11/12 rounded-md py-3 text-white absolute left-5 bottom-2"
                                >
                                  Update
                                </button>
                              </form>
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

export default Profile;
