import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaChartsC = ({ sidebarToggle }) => {
  const [barChartWidth, setBarChartWidth] = useState(400);

  useEffect(() => {
    setBarChartWidth(sidebarToggle ? 320 : 400);
  }, [sidebarToggle]);
  const data = [
    {
      name: "  A",
      uv: 1220,
      pv: 2600,
      amt: 240,
    },
    {
      name: "  B",
      uv: 1300,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "  C",
      uv: 1500,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "  D",
      uv: 2180,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "  E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "  F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "  G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div>
      <AreaChart
        width={barChartWidth}
        height={365}
        data={data}
        margin={{
          top: 30,
          right: 14,
          left: -8,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#9A54F8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#9A54F8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} left={24} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartsC;
