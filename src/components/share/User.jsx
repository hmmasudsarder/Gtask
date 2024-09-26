import { useState } from "react";
import user from "../../assets/user.jpg";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
const User = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const handleLoginClick = () => {
    navigate("/login");
    console.log("click");
  };

  return (
    <div>
      <div className="relative" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          <img
            src={user}
            alt="userLogo"
            className="h-12 w-15 group object-cover rounded-full cursor-pointer"
          />
          <span className="text-base mt-3">Admin</span>{" "}
          <RiArrowRightSLine className="text-2xl mt-3" />
        </div>
      </div>
      {open && (
        <div className="bg-white p-4 w-44 rounded-lg shadow-lg absolute right-0 top-[65px] hidden z-30 group-focus:block">
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
