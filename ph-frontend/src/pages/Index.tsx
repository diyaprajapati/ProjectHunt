import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthDialog } from "@/components/AuthDialog";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import { toast } from "sonner";
import axios from "axios";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]); // All projects
  const [userProjects, setUserProjects] = useState([]); // User-specific projects

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/auth/verify-token")
        .then(() => {
          setIsAuthenticated(true);
          fetchAllProjects();
        })
        .catch(() => {
          localStorage.clear();
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchAllProjects = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:8080/api/projects/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching all projects:", error);
    }
  };



  // On page load, validate token and fetch projects
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/auth/verify-token")
        .then(() => {
          setIsAuthenticated(true);
          fetchAllProjects(); // Fetch projects once authentication is verified
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("userId"); // Remove userId if invalid
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Code className="text-blue-500 h-8 w-8" />
          <h1 className="text-white font-bold text-2xl">ProjectHunt</h1>
        </div>
        <div className="flex gap-3">
          {!isAuthenticated ? (
            <Button variant="secondary" onClick={() => setShowAuthDialog(true)}>
              Sign In
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate("/my-projects")}
              >
                Your Projects
              </Button>
              <Button
                variant="default"
                onClick={() => setShowCreateProject(true)}
              >
                Submit Project
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center px-4 py-12 md:py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Discover & Upvote <span className="text-blue-500">Innovative</span>{" "}
          Tech Projects
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Explore cutting-edge software projects, support emerging innovations,
          and connect with creators.
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Input
            type="search"
            placeholder="Search projects, tags or creators..."
            className="w-full bg-gray-800/50 border-gray-700 text-white h-12 pl-4 pr-12 hover:border-blue-400/30"
          />
          <Sparkle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      {/* User Projects */}
      {isAuthenticated && userProjects.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <h3 className="text-xl text-white font-semibold mb-4">
            Your Projects
          </h3>
          <div className="space-y-4">
            {userProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                creator={project.creator}
                tags={project.tags}
                upvotes={project.upvotes}
                onUpvote={function (id: number): void {
                  throw new Error("Function not implemented.");
                }} />
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      {/* <section className="max-w-5xl mx-auto px-4 pb-20">
        <h3 className="text-xl text-white font-semibold mb-4">All Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              creator={project.creator}
              tags={project.tags}
              upvotes={project.upvotes} onUpvote={function (id: number): void {
                throw new Error("Function not implemented.");
              }} />
          ))}
        </div>
      </section> */}

      {/* All Projects */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h3 className="text-xl text-white font-semibold mb-4">All Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title && project.title.trim() ? project.title : "Untitled Project"} // Fallback if title is missing or empty
              description={project.description || "No description available."} // Fallback for description
              creator={project.creator || "Unknown"} // Fallback for creator
              tags={project.tags || []} // Default empty array for tags
              upvotes={project.upvotes || 0} // Default 0 for upvotes
              onUpvote={(id) => {
                console.log(`Upvote clicked for project ID: ${id}`); // Placeholder for upvote functionality
              }}
            />
          ))}
        </div>
      </section>

      {/* Dialogs */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onSuccess={(token) => {
          localStorage.setItem("authToken", token);
          setIsAuthenticated(true);
          fetchAllProjects();
          toast.success("Successfully signed in!");
        }}
      />

      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
        onSuccess={() => {
          setShowCreateProject(false);
          fetchAllProjects();
          toast.success("Project submitted successfully!");
        }}
      />
    </div>
  );
};

export default Index;
