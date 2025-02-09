import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp } from "lucide-react";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import { toast } from "sonner";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  upvoteCount: number;
  tags: any[];
  createdBy: string;
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

  const handleUpvote = async (projectId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:8080/api/upvote/${projectId}`,  // Updated endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the projects array with new upvote count
      setProjects(projects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            upvoteCount: response.data.upvoteCount,
            isUpvoted: response.data.isUpvoted
          };
        }
        return project;
      }));

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error upvoting project:", error);
      toast.error("Failed to upvote project");
    }
  };

  // Add this function to fetch upvote status when user logs in
  const fetchUpvoteStatuses = async () => {

    try {
      const token = localStorage.getItem("authToken");
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/upvote/${project.id}/status`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return { ...project, isUpvoted: response.data.isUpvoted };
          } catch (error) {
            return { ...project, isUpvoted: false };
          }
        })
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error fetching upvote statuses:", error);
    }
  };

  useEffect(() => {
    fetchUpvoteStatuses();
  }, []);

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
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.name || "Untitled Project"}
          websiteLink={project.websiteLink}
          description={project.description || "No description available."}
          creator={project.createdBy || "Unknown"}
          tags={project.tags || []}
          upvoteCount={project.upvoteCount || 0}
          onUpvote={handleUpvote}
        />
      ))}

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