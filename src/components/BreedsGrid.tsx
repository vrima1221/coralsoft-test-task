import { useState } from "react";
import { CatModel } from "../types/cat";

const BreedsGrid = ({ cats }: { cats: CatModel[] }) => {
  const [sortBy, setSortBy] = useState("name");
  const [filterOrigin, setFilterOrigin] = useState("");

  const uniqueOrigins = [...new Set(cats?.map((cat) => cat.origin))];

  const sortedBreeds = [...(cats || [])].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "adaptability") return b.adaptability - a.adaptability;
    if (sortBy === "affection") return b.affection_level - a.affection_level;
    return 0;
  });

  const filteredBreeds = filterOrigin
    ? sortedBreeds.filter((cat) => cat.origin === filterOrigin)
    : sortedBreeds;

  return (
    <div className="container mx-auto py-8 dark:bg-gray-800 dark:text-white">
      {/* Sorting and Filtering Controls */}
      <div className="flex justify-between mb-4">
        {/* Sorting Dropdown */}
        <select
          className="hs-dropdown-toggle border px-2 py-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="adaptability">Sort by Adaptability</option>
          <option value="affection">Sort by Affection Level</option>
        </select>

        {/* Filtering Dropdown */}
        <select
          className="hs-dropdown-toggle border px-2 py-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={filterOrigin}
          onChange={(e) => setFilterOrigin(e.target.value)}
        >
          <option value="">All Origins</option>
          {uniqueOrigins.map((origin) => (
            <option key={origin} value={origin}>
              {origin}
            </option>
          ))}
        </select>
      </div>

      {/* Cats Grid */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6">
        {filteredBreeds?.map((cat: CatModel) => (
          <div
            key={Math.random()}
            className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg"
          >
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
                {cat.name}
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-400">
                Origin: {cat.origin || "Unknown"}
              </span>
              <p className="mt-3 text-gray-500 line-clamp-3 dark:text-gray-300">
                {cat.description || "No description available"}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Adaptability:</span>
                  <span>{`${cat.adaptability}/5`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Affection Level:</span>
                  <span>{`${cat.affection_level}/5`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Life Span:</span>
                  <span>{`${cat.life_span} years`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreedsGrid;
