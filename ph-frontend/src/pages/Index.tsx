import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthDialog } from "@/components/AuthDialog";
import ProjectCard from "@/components/ProjectCard";
// import CreateProjectDialog from "@/components/CreateProjectDialog";
import { toast } from "sonner";
import axios from "axios";
import { LogoutAlertDialog } from "@/components/LogoutAlertDialog";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  // const [showCreateProject, setShowCreateProject] = useState(false);
  const [logout, setLogOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Added for search

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    setProjects([]); // Clear projects
    setUserProjects([]); // Clear user projects

    fetchAllProjects();
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiration = payload.exp * 1000;
      const timeLeft = expiration - Date.now();

      if (timeLeft > 0) {
        const timeout = setTimeout(() => {
          handleLogout();
          toast.warning("Session expired. Please log in again.");
        }, timeLeft);
        return () => clearTimeout(timeout); // Cleanup
      } else {
        handleLogout();
      }
    }
  }, []);

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/projects/all`);

      const mappedProjects = response.data.map((project) => {
        return {
          ...project,
          upvotes: project.upvoteCount || 0,
        };
      });
      setProjects(mappedProjects);
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchAllProjects();

    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/auth/verify-token")
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.clear();
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleUpvote = async (projectId) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upvote/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(
        projects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              upvoteCount: response.data.upvoteCount,
              isUpvoted: response.data.isUpvoted,
            };
          }
          return project;
        })
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error upvoting project:", error);
      toast.error("Failed to upvote project");
    }
  };

  const fetchUpvoteStatuses = async () => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem("authToken");
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/upvote/${project.id}/status`,
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
    if (isAuthenticated) {
      fetchUpvoteStatuses();
    }
  }, [isAuthenticated]);

  // Filtered projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.createdBy &&
        project.createdBy.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
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
              <Button variant="secondary" onClick={() => navigate("/my-projects")}>
                Your Projects
              </Button>
              {/* <Button variant="default" onClick={() => setShowCreateProject(true)}>
                Submit Project
              </Button> */}
              <Button variant="default" onClick={() => setLogOut(true)}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

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
            value={searchQuery} // Added binding
            onChange={(e) => setSearchQuery(e.target.value)} // Added handler
            className="w-full bg-gray-800/50 border-gray-700 text-white h-12 pl-4 pr-12 hover:border-blue-400/30"
          />
          <Sparkle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h3 className="text-xl text-white font-semibold mb-4">All Projects</h3>
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.name || "Untitled Project"}
              websiteLink={project.websiteLink}
              description={project.description || "No description available."}
              creator={project.createdBy || "Unknown"}
              languages={project.languages || []}
              upvoteCount={project.upvoteCount || 0}
              isUpvoted={project.isUpvoted}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      </section>

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

      <LogoutAlertDialog
        open={logout}
        onOpenChange={setLogOut}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Index;