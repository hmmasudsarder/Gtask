import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import Dashboard from "../pages/Dashboard/Dashboard";

const Main = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  return (
    <div>
      <div
        className={`${sidebarToggle ? "duration-500 ease-in-out" : "ml-0 md:-ml-60"}`}
      >
        <div className="">
          <div className="sticky top-0 z-40">
            <Navbar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
            />
          </div>
          <Dashboard sidebarToggle={sidebarToggle} />
        </div>
        <div className="">
          <Sidebar sidebarToggle={sidebarToggle} />
        </div>
        <Outlet />
      </div>

      {/* <div className="">
        <div className={`bg-gray-100 m-0 h-full pb-10`}>
          <div
            className={`${
              sidebarToggle ? "duration-500 ease-in-out" : "ml-0 md:ml-60"
            }`}
          >
            <Navbar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
            />
          </div>
          <div className="">
            <Sidebar sidebarToggle={sidebarToggle} />
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div> */}
      <div className="">{/* <Sidebars /> */}</div>
    </div>
  );
};

export default Main;
