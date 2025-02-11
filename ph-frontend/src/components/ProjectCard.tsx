import React from "react";
import { Trash, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  websiteLink: string;
  creator: string;
  languages?: { id: number; name: string; }[];
  upvoteCount: number;
  onUpvote: (id: number) => void;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
  isUpvoted?: boolean;
}

const ProjectCard = React.memo(
  ({
    id,
    title,
    description,
    websiteLink,
    creator,
    languages = [],
    upvoteCount,
    onUpvote,
    showDelete = false,
    onDelete,
    isUpvoted = false,
  }: ProjectCardProps) => {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-gray-800/70">
        <div className="flex justify-between items-start">
          {/* Left section with title, description, tags */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                <h3 className="text-lg font-bold text-white">
                  {title || "Untitled Project"}
                </h3>
              </a>
              {languages.length > 0 && (
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <Badge
                      key={lang.id}
                      variant="secondary"
                      className="bg-blue-900/50 text-blue-300 hover:border-blue-900 hover:bg-transparent"
                    >
                      {lang.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <p className="text-gray-400 mb-2">
              {description || "No description available."}
            </p>
            <p className="text-gray-500 text-sm">Created by {creator}</p>
          </div>

          {/* Right section with buttons */}
          <div className="flex items-center gap-2">
            {showDelete && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                onClick={() => onDelete(id)}
                aria-label="Delete project"
              >
                <Trash className="h-5 w-5" />
              </Button>
            )}
            <button
              onClick={() => onUpvote(id)}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2 text-white",
                "bg-gray-700/50 hover:bg-gray-700 transition-colors",
                isUpvoted
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700/50 hover:bg-gray-700"
              )}
              aria-label="Upvote project"
            >
              <ArrowUp className="h-5 w-5" />
              <span className="font-medium">{upvoteCount}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProjectCard;
