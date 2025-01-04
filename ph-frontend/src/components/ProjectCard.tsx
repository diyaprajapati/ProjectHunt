import { Trash, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  creator: string;
  tags: string[];
  upvotes: number;
  onUpvote: (id: number) => void;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
}

const ProjectCard = ({
  id,
  title,
  description,
  creator,
  tags,
  upvotes,
  onUpvote,
  onDelete,
  showDelete = false
}: ProjectCardProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-gray-800/70">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-blue-900/50 text-blue-300 hover:border-blue-900 hover:bg-transparent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-gray-400 mb-2">{description}</p>
          <p className="text-gray-500 text-sm">Created by {creator}</p>
        </div>
        <div className="flex items-center gap-2">
          {showDelete && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
              onClick={() => onDelete(id)}
            >
              <Trash className="h-5 w-5" />
            </Button>
          )}
          <button
            onClick={() => onUpvote(id)}
            className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 transition-colors rounded-full px-4 py-2 text-white"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="font-medium">{upvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;