import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: number;
  name: string;
  websiteLink: string;
  description: string;
  upvotes?: number;
}

const UserProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");

  // Fetch projects from the server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects from server...");
        const response = await axios.get("http://localhost:8080/api/projects");
        setProjects(response.data);
        console.log("Projects fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter and sort projects whenever projects, searchQuery, or sortBy changes
  useEffect(() => {
    const filtered = projects
      .filter((project) =>
        project?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        sortBy === "popular"
          ? (b.upvotes || 0) - (a.upvotes || 0)
          : (b.id || 0) - (a.id || 0)
      );

    setFilteredProjects(filtered);
    console.log("Filtered and sorted projects:", filtered);
  }, [projects, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white font-bold text-4xl">Your Projects</h1>
        <Button className="bg-blue-700 hover:bg-blue-800">+ New Project </Button>
      </div>

      {/* Search and Sort Section */}
      <div className="flex items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search your projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800/50 border-gray-700 text-white h-12 pl-4 pr-12 hover:border-blue-400/30"
        />
        {/* <button
          onClick={() => setSortBy("newest")}
          className={`px-4 py-2 rounded ${sortBy === "newest"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
            }`}
        >
          Sort by Newest
        </button> */}
        <Select>
          <SelectTrigger className="w-[180px] bg-gray-700 text-white border border-gray-700">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-none text-white">
            <SelectGroup>
              <SelectItem value="sort by newest" onSelect={() => setSortBy("newest")}
                className={`px-4 py-2 rounded ${sortBy === "newest"
                  ? "hover:bg-gray-400 hover:text-white"
                  : "hover:bg-gray-400 hover:text-white"
                  }`}>Sort by Newest</SelectItem>
              <SelectItem value="sort by populer" onSelect={() => setSortBy("popular")}
                className={`px-4 py-2 rounded ${sortBy === "popular"
                  ? "hover:bg-gray-400 hover:text-white"
                  : "hover:bg-gray-400 hover:text-white"
                  }`}>Sort by Populer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <button
          onClick={() => setSortBy("popular")}
          className={`px-4 py-2 rounded ${sortBy === "popular"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
            }`}
        >
          Sort by Popular
        </button> */}
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 px-4 py-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                <h2 className="text-lg font-bold text-white mb-2 hover:text-blue-400">
                  {project.name}
                </h2>
              </a>
              <p className="text-gray-400 text-base mb-4 font-semibold">{project.description}</p>
              <p className="text-gray-300 mt-2">Upvotes: {project.upvotes || 0}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-8">
          You haven't created any projects yet
        </p>
      )}
    </div>
  );
};

export default UserProjects;