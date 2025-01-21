import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";

const UserProjects = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from the backend
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       setIsLoading(true);
  //       console.log("Fetching projects from server...");
  //       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/projects`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //       });
  //       setProjects(response.data);
  //       console.log("Projects fetched successfully from server");
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching user projects:", error);
  //       toast.error("Failed to load projects");
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching projects from server...");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/projects`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log(response.data);
        setProjects(response.data || []);
        console.log("Projects fetched successfully from server");
      } catch (error) {
        console.error("Error fetching user projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);


  const handleDeleteProject = async (projectId: number) => {
    try {
      await axios.delete(`/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const filteredProjects = projects
    .filter((project) =>
      project.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "popular" ? b.upvotes - a.upvotes : b.id - a.id
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Your Projects</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search your projects..."
              className="pl-10 bg-gray-800/50 border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full sm:w-auto">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort by {sortBy === "newest" ? "Newest" : "Popular"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  Popular
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setShowCreateProject(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-400">Loading projects...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onUpvote={() => { }}
                onDelete={() => handleDeleteProject(project.id)}
                showDelete
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {searchQuery
                  ? "No projects found matching your search"
                  : "You haven't created any projects yet"}
              </p>
            </div>
          )}
        </div>
      </div>

      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
        onSuccess={(newProject) => {
          setProjects((prevProjects) => [...prevProjects, newProject]);
          setShowCreateProject(false);
        }}
      />
    </div>
  );
};

export default UserProjects;
