import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";

const Main = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  console.log(sidebarToggle);
  
  return (
    <div className="">
      <div className={`${sidebarToggle ? "duration-500 ease-in-out" : "ml-0 md:ml-60"} sticky top-0 `}>
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          
        />
      </div>
      <div className="">
        <Sidebar sidebarToggle={sidebarToggle}  />
      </div>
    <div className="">
    <Outlet />
    </div>
    </div>
  );
};

export default Main;
