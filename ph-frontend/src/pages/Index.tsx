import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ChevronLeft, ChevronRight, Code, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AuthDialog } from "@/components/AuthDialog";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import { toast } from "sonner";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleUpvote = (projectId: number) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    toast.success("Project upvoted successfully!");
  };

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
            <Button 
              variant="secondary" 
              onClick={() => setShowAuthDialog(true)}
            >
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
          Discover & Upvote <span className="text-blue-500">Innovative</span> Tech Projects
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Explore cutting-edge software projects, support emerging innovations, and connect with creators.
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Input 
            type="search"
            placeholder="Search projects, tags or creators..."
            className="w-full bg-gray-800/50 border-gray-700 text-white h-12 pl-4 pr-12"
          />
          <Sparkle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="space-y-4">
          <ProjectCard
            id={1}
            title="Example Project"
            description="An amazing project description goes here"
            creator="John Doe"
            tags={["tech", "ai"]}
            upvotes={42}
            onUpvote={handleUpvote}
          />
        </div>
      </section>

      {/* Dialogs */}
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        onSuccess={() => {
          setIsAuthenticated(true);
          setShowAuthDialog(false);
          toast.success("Successfully signed in!");
        }}
      />

      <CreateProjectDialog
        open={showCreateProject}
        onOpenChange={setShowCreateProject}
        onSuccess={() => {
          setShowCreateProject(false);
          toast.success("Project submitted successfully!");
        }}
      />
    </div>
  );
};

export default Index;