import { Dropdown, Space } from "antd";
import { FaRegUser } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
// import { GiLevelThreeAdvanced } from "react-icons/gi";

const Sidebar = ({ sidebarToggle }) => {
  const items = [
    {
      label: (
        <li className="rounded hover:bg-violet-200 hover:text-violet-600 px-10">
          <Link to="/product" className="text-base ">
            <FaRegUser className="inline-block w-5 h-4 -mt-2 mr-[10px]" />
            Profile
          </Link>
        </li>
      ),
      key: "0",
    },
    {
      label: (
        <li className="rounded hover:bg-violet-200 hover:text-violet-600 px-10">
          <Link to="/user" className="text-base">
            <GoHome className="inline-block w-5 h-5 -mt-2 mr-[6px]" /> Bulk List
          </Link>
        </li>
      ),
      key: "1",
    },
  ];
  return (
    <div className="duration-300 ease-in-out">
      <div
        className={`w-[250px] bg-white fixed z-50 h-full md:block px-4 py-2 border-r-2 duration-1000 border-violet-100 md:top-0 ease-in ${
          sidebarToggle
            ? "duration-1000 ease-in-out hidden"
            : "block ease-in duration-1000"
        } `}
      >
        <Link to="/">
          <div className="my-2 mb-4 mt-2 p-3  rounded-md flex items-center gap-1 hover:bg-violet-200 hover:text-violet-600">
            <RxDashboard className="text-base" />
            <h2 className="text-lg">Dashboard</h2>
          </div>
        </Link>
        <ul className="">
          <li className="rounded hover:bg-violet-200 hover:text-violet-600 p-3">
            <Link to="/product" className="text-base">
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
                trigger={["click"]}
              >
                <Link to="/product" onClick={(e) => e.preventDefault()}>
                  <Space className="">
                    <FaRegUser className="inline-block w-5 h-5 -mt-2 mr-[6px]" />
                    Profile <DownOutlined />
                  </Space>
                </Link>
              </Dropdown>
            </Link>
          </li>
          <li className="rounded hover:bg-violet-200 hover:text-violet-600 p-3">
            <Link to="/devise" className="text-base">
              <HiOutlineArrowPathRoundedSquare className="inline-block w-5 h-5 -mt-2 mr-[6px]" />
              Devise
            </Link>
          </li>
          {/* <li className="rounded hover:bg-violet-200 hover:text-violet-600 p-3">
            <Link to="/status" className="text-base">
              <GiLevelThreeAdvanced className="inline-block w-5 h-5 -mt-2 mr-[6px]" />
              Status
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarToggle: PropTypes.bool,
};

export default Sidebar;
