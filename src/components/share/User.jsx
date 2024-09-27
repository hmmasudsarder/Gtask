import { useEffect, useState } from "react";
import user from "../../assets/user.jpg";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import 'aos/dist/aos.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Aos from "aos";


const User = () => {
  const [open, setOpen] = useState(!true);
  const navigate = useNavigate();



  const handleLoginClick = () => {
    navigate("/login");
    console.log("click");
  };

  const token = localStorage.getItem("token")
  console.log(token);
  const { data: sms = [] } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const { data } = await axios.get(" http://52.74.26.144:9000/client/apiClient/list/", {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      return data;
    },
  });
  console.log(sms?.results);  

  // fetch('http://52.74.26.144:9000/client/bulkClient/list/?q=pocah', {
  //   method: 'GET',
  //   headers: {
  //     Authorization: 'Bearer 11ac4faeccb7c1c05e7bc8c582c5f4a6a1862c64',
  //   }
  // })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Unauthorized access');
  //     }
  //     return response.json();
  //   })
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));
    
    useEffect(() => {
      Aos.init();
    }, [])

  return (
    <div>
      <div className="relative" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          <img
            src={user}
            alt="userLogo"
            className="h-12 w-15 object-cover rounded-full cursor-pointer"
          />
          <span className="text-base mt-3">Admin</span>{" "}
          <RiArrowRightSLine className="text-2xl mt-3" />
        </div>
      </div>
      {open && (
        <div data-aos="zoom-in" className="bg-white p-4 w-44 rounded-lg shadow-lg absolute right-0 top-[65px] z-30 hover:scale-90">
          <ul>
            <li className="p-1 text-start text-lg cursor-pointer flex items-center gap-4">
              <FaRegUser className="mt-1" /> Profile
            </li>
            <li className="p-1 text-start text-lg cursor-pointer flex items-center gap-4">
              <Link
                to="/login"
                onClick={handleLoginClick}
                className="flex items-center gap-4"
              >
                <MdOutlineLogout className="mt-2" /> Log In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
