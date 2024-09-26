import { FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
import User from "../share/User";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className="">
      <div className="bg-white px-10 py-4 border-b-2 border-violet-100 flex justify-between duration-700 ease-in-out">
        {/* left site navbar icons title  */}
        <div className="flex items-center ">
          {sidebarToggle ? (
            <FaBars
              className="text-black ml-64 cursor-pointer absolute right-5 md:left-5"
              onClick={() => setSidebarToggle(!sidebarToggle)}
            />
          ) : (
            <VscChromeClose
              onClick={() => setSidebarToggle(!sidebarToggle)}
              className="text-black text-2xl font-extrabold right-5 md:ml-60 cursor-pointer absolute md:top-[30px] md:left-5"
            />
          )}
          <span className="text-black text-xl -ml-4 md:ml-64 poppins">
            Business Center
          </span>
        </div>
        {/* right site icons div  */}
        <div className="flex items-center gap-x-5">
          <div className="text-black">
            <FiShoppingCart className="w-6 h-6 cursor-pointer hidden lg:block" />
          </div>

          <div className="text-black">
            <IoIosNotificationsOutline className="w-6 h-6 cursor-pointer hidden lg:block" />
          </div>
          <div className="relative">
            <button className="text-black group hidden md:block">
              <User />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
