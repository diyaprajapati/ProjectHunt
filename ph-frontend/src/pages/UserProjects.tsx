import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Your Projects</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          + New Project
        </button>
      </div>

      {/* Search and Sort Section */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search your projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={() => setSortBy("newest")}
          className={`px-4 py-2 rounded ${sortBy === "newest"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
            }`}
        >
          Sort by Newest
        </button>
        <button
          onClick={() => setSortBy("popular")}
          className={`px-4 py-2 rounded ${sortBy === "popular"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
            }`}
        >
          Sort by Popular
        </button>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold text-white mb-2">
                {project.name}
              </h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Visit Website
              </a>
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
