import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [organizationName, setOrganizationName] = useState(null)
  const navigate = useNavigate();

  // checking if token is valid or not
  const token = localStorage.getItem("token");
  if (!token) {
    return navigate("/login");
  }

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


  // handle post data submission
  const handlePost = async() =>{
    const email = userEmail;
    const username = userName;
    const organization = organizationName;
    const postData = {
      email: email,
      username: username,
      organization: organization,
    }
    await axios.post(
      "http://52.74.26.144:9000/client/apiClient/create/", // Now using '/api' which will be proxied
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Use "Bearer" if your API expects it
        }
      }
    ).then((data)=>{
      console.log("Data sent successfully", data);
      navigate("/product")
    }).catch((error)=>{
      console.log("Error sending data", error);
    })

  }

  return (
    <div data-aos="fade-down" className="mt-8">
      <div className="space-y-2">
        <h1 className="text-xl">Home Page</h1>
        <p className="text-primary">Home</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-xl flex items-center justify-between gap-4">
          All User List
        </h2>
        <button
          className="bg-primary flex items-center px-4 py-2 gap-4 rounded text-white"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <FaPlus className="text-white" /> Add
        </button>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div
              // onSubmit={handleSubmit}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
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
                  <label htmlFor="organization" className="block mb-2 text-sm">
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
              <div>
                <button
                  onClick={handlePost}
                  // type="submit"
                  className="bg-primary w-full rounded-md py-3 text-white"
                >
                  Continue
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
  );
};

export default Home;
