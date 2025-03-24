import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { CatModel, ChartData, LifeSpanData } from "../types/cat";

const COLORS: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const Charts = ({ cats }: { cats: CatModel[] }) => {
  const [adaptabilityData, setAdaptabilityData] = useState<ChartData[]>([]);
  const [affectionData, setAffectionData] = useState<ChartData[]>([]);
  const [originData, setOriginData] = useState<ChartData[]>([]);
  const [indoorData, setIndoorData] = useState<ChartData[]>([]);
  const [lapData, setLapData] = useState<ChartData[]>([]);
  const [lifeSpanData, setLifeSpanData] = useState<LifeSpanData[]>([]);

  useEffect(() => {
    if (!cats || !cats.length) return;

    setAdaptabilityData(
      cats.map((cat: CatModel) => ({
        name: cat.name,
        value: cat.adaptability,
      }))
    );

    setAffectionData(
      cats.map((cat: CatModel) => ({
        name: cat.name,
        value: cat.affection_level,
      }))
    );

    const originCount = cats.reduce((acc: Record<string, number>, cat: CatModel) => {
      if (!acc[cat.origin]) {
        acc[cat.origin] = 1;
      } else {
        acc[cat.origin] += 1;
      }
      return acc;
    }, {});

    const originData = Object.keys(originCount).map((origin) => ({
      name: origin,
      value: originCount[origin],
    }));

    setOriginData(originData);

    const indoorCount = cats.reduce(
      (acc: { indoor: number; outdoor: number }, cat: CatModel) => {
        if (cat.indoor === 1) {
          acc.indoor = (acc.indoor || 0) + 1;
        } else {
          acc.outdoor = (acc.outdoor || 0) + 1;
        }
        return acc;
      },
      { indoor: 0, outdoor: 0 }
    );

    setIndoorData([
      { name: "Indoor", value: indoorCount.indoor || 0 },
      { name: "Outdoor", value: indoorCount.outdoor || 0 },
    ]);

    const lapCatCount = cats.reduce(
      (acc: { lap: number; notLap: number }, cat: CatModel) => {
        if (cat.lap === 1) {
          acc.lap = (acc.lap || 0) + 1;
        } else {
          acc.notLap = (acc.notLap || 0) + 1;
        }
        return acc;
      },
      { lap: 0, notLap: 0 }
    );

    setLapData([
      { name: "Lap Cat", value: lapCatCount.lap },
      { name: "Not Lap Cat", value: lapCatCount.notLap },
    ]);

    setLifeSpanData(
      cats.map((cat: CatModel) => ({
        name: cat.name,
        years: `${cat.life_span.split(' - ')[1]}`,
      }))
    );
  }, [cats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
      {/* Adaptability Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Adaptability Distribution
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <BarChart data={adaptabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Affection Levels */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Affection Levels</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <BarChart data={affectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Origins */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Top Origins</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={originData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {originData.map((_: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Indoor vs Outdoor Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Indoor vs Outdoor Preference
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={indoorData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {indoorData.map((_: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lap Cat Distribution */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Lap Cat Distribution</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={lapData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {lapData.map((_: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Life Span Distribution */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Life Span Distribution</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <LineChart data={lifeSpanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="years" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
