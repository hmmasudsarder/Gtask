import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const token = localStorage.getItem("token");
  // console.log(token);
  const { data: sms = [] } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const { data } = await axios.post(
        "http://52.74.26.144:9000/client/apiClient/create/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return data;
    },
  });
  console.log(sms?.results);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.email.value;
    const username = form.elements.username.value;
    const organization = form.elements.organization.value;
    console.log(email, username, organization);
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://52.74.26.144:9000/client/apiClient/create/", // Now using '/api' which will be proxied
        {
          email: email,
          username: username,
          organization: organization
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Use "Bearer" if your API expects it
          },
          withCredentials: true
        }
      );

      console.log("Data sent successfully", response.data);
      form.reset(); // Reset the form after successful submission
      alert("Data submitted successfully!");
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.status,
        error.response
      );
      alert("An error occurred while submitting the form.");
    }
  };
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
            <form
              onSubmit={handleSubmit}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Enter Your Office Email
                  </label>
                  <input
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
                  type="submit"
                  className="bg-primary w-full rounded-md py-3 text-white"
                >
                  Continue
                </button>
              </div>
            </form>
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
