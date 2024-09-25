import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Area,
} from "recharts";
import AreaChartsC from "../../components/share/AreaChartsC";
import Profile from "../../components/Profile";
import { useEffect, useState } from "react";

const data = [
  {
    name: "F",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "A",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "B",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "C",
    date: "2023",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "D",
    date: "2000",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const Dashboard = ({ sidebarToggle }) => {
  const [barChartWidth, setBarChartWidth] = useState(400);

  useEffect(() => {
    setBarChartWidth(sidebarToggle ? 320 : 400);
  }, [sidebarToggle]);
  return (
    // change some margin left side for full divise
    <div className="lg:ml-60 lg:px-10 !overflow-hidden z-0 bg-gray-200">
      <div className="">
        {/* title dashboard  */}
        <div className="">
          <h2 className="text-xl font-semibold mt-4 mb-7">Dashboard</h2>
        </div>
        {/* dashboard card desing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3 md:mx-auto">
          <div className="bg-gradient-to-r from-purple-400 to-violet-100 h-36 rounded-lg">
            <div className="text-white text-center mt-5 space-y-1">
              <h2 className="text-4xl font-semibold">Weekly Sales</h2>
              <p className="">$ 500000</p>
              <p className="">Increase by 30%</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-violet-400 to-violet-100 h-36 rounded-lg">
            <div className="text-white text-center mt-5 space-y-1">
              <h2 className="text-4xl font-semibold">Monthly Sales</h2>
              <p className="">$ 500000</p>
              <p className="">Increase by 20%</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-violet-100 h-36 rounded-lg">
            <div className="text-white text-center mt-5 space-y-1">
              <h2 className="text-4xl font-semibold">Yearly Sales</h2>
              <p className="">$ 500000</p>
              <p className="">Increase by 10%</p>
            </div>
          </div>
        </div>
        {/* chart bar staart here  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          <div className="bg-white rounded-md h-full md:h-[65vh] mx-3 md:mx-auto">
            <AreaChartsC sidebarToggle={sidebarToggle} />
          </div>
          <div className="bg-white ml-0 xl:ml-1 rounded-md h-full md:h-[65vh] mx-3 md:mx-auto">
            <BarChart
              width={barChartWidth}
              height={360}
              data={data}
              margin={{
                top: 40,
                right: 5,
                left: -5,
                bottom: 0,
              }}
            >
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="pv" fill="#827EF5" />
              <Bar dataKey="uv" fill="#9A54F8" />
            </BarChart>
          </div>
          <div className="bg-white rounded-md h-full md:h-[65vh] mx-3 md:mx-auto">
            <AreaChartsC sidebarToggle={sidebarToggle} />
          </div>
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default Dashboard;
