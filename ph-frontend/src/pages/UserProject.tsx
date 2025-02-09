import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp } from "lucide-react";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import { toast } from "sonner";

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
  const [showCreateProject, setShowCreateProject] = useState(false);

  // Fetch projects from the server
  const fetchUserProjects = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:8080/api/projects/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };

  useEffect(() => {
    fetchUserProjects();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 md:p-16 p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-white font-bold text-4xl">Your Projects</h1>
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => setShowCreateProject(true)}>+ New Project </Button>
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
        <Select onValueChange={(value) => setSortBy(value as "newest" | "popular")}>
          <SelectTrigger className="w-[180px] bg-gray-700 text-white border border-gray-700">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-none text-white">
            <SelectGroup>
              <SelectItem value="newest">Sort by Newest</SelectItem>
              <SelectItem value="popular">Sort by Popular</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="flex flex-col gap-3 justify-center self-center items-center">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800/50 hover:bg-gray-800/70 px-4 py-5 rounded-lg shadow hover:shadow-lg transition md:w-[90%] w-full flex justify-between items-center"
            >
              <div>
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
              </div>
              <div>
                {/* <p className="text-gray-300 mt-2">Upvotes: {project.upvotes || 0}</p> */}
                <div className="flex items-center gap-2 bg-gray-700/80 py-3 rounded-full px-4 hover:bg-gray-700/90 transition-all cursor-pointer">
                  <ArrowUp className="text-white" />
                  <p className="text-gray-300">{project.upvotes || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-8">
          You haven't created any projects yet
        </p>
      )}

      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
        onSuccess={() => {
          setShowCreateProject(false);
          fetchUserProjects();
          toast.success("Project submitted successfully!");
        }}
      />
    </div>
  );
};

export default UserProjects;