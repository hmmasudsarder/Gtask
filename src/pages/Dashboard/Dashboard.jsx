import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import AreaChartsC from "../../components/share/AreaChartsC";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  const { data: sms = [] } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const { data } = await axios.get(
        " http://52.74.26.144:9000/client/apiClient/list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return data;
    },
  });
  const [params, setParams] = useSearchParams();
  const [barChartWidth, setBarChartWidth] = useState(400);

  const checkState = params.get("currentState");

  useEffect(() => {
    if (checkState === "true" && "null") {
      setBarChartWidth(400);
    } else {
      setBarChartWidth(320);
    }
  }, [checkState]);

  // Force re-render when checkState changes
  useEffect(() => {
    setParams({ currentState: checkState });
  }, [checkState, setParams]);
  if (!token) {
    return navigate("/login");
  }

  return (
    // change some margin left side for full divise
    <div className=" bg-gray-50">
      <div data-aos="fade-down" className="z-0">
        <div className="">
          <div className="">
            {/* title dashboard  */}
            <div className="">
              <h2 className="text-xl mt-4 mb-7">Dashboard</h2>
            </div>
            {/* dashboard card desing */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3 md:mx-auto">
              <div
                data-aos="fade-left"
                className="bg-gradient-to-r from-purple-400 to-violet-100 h-36 rounded-lg"
              >
                <div className="text-white text-center mt-5 space-y-1">
                  <h2 className="text-4xl font-semibold">Weekly Sales</h2>
                  <p className="">$ 500000</p>
                  <p className="">Increase by 30%</p>
                </div>
              </div>
              <div
                data-aos="fade-up"
                className="bg-gradient-to-r from-violet-400 to-violet-100 h-36 rounded-lg"
              >
                <div className="text-white text-center mt-5 space-y-1">
                  <h2 className="text-4xl font-semibold">Monthly Sales</h2>
                  <p className="">$ 500000</p>
                  <p className="">Increase by 20%</p>
                </div>
              </div>
              <div
                data-aos="fade-left"
                className="bg-gradient-to-r from-purple-400 to-violet-100 h-36 rounded-lg"
              >
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
                <AreaChartsC />
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
                <AreaChartsC />
              </div>
            </div>
            <div className="flex flex-row flex-nowrap overflow-x-scroll md:overflow-hidden scroll-smooth">
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
                        <td className="border-b-[1px] px-4 py-6">
                          {index + 1}
                        </td>
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
                        <td className="border-b-[1px] px-4 py-6">
                          {item.email}
                        </td>{" "}
                        <td className="border-b-[1px] px-4 py-6">
                          {/* Replace with your action buttons */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
