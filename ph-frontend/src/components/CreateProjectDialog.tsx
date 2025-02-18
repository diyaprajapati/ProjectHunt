// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { PROGRAMMING_LANGUAGES } from "@/lib/constants";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import axiosInstance from "@/lib/axios";

// interface CreateProjectDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSuccess: (newProject: any) => void;
// }

// const CreateProjectDialog = ({ open, onOpenChange, onSuccess }: CreateProjectDialogProps) => {
//   const [loading, setLoading] = useState(false);
//   const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
//   const [openLanguages, setOpenLanguages] = useState(false);

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   const formData = new FormData(e.target as HTMLFormElement);
//   //   const data = Object.fromEntries(formData);

//   //   try {
//   //     const response = await axiosInstance.post("/projects", {
//   //       title: data.title,
//   //       description: data.description,
//   //       websiteLink: data.websiteLink,
//   //       language: selectedLanguages,
//   //       createdBy: data.createdBy,
//   //     });

//   //     if (response.status === 200) {
//   //       toast.success("Project created successfully!");
//   //       onSuccess(response.data);
//   //     }
//   //   } catch (error) {
//   //     toast.error("Failed to create project");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target as HTMLFormElement);
//     const data = Object.fromEntries(formData);

//     try {
//       const response = await axiosInstance.post("/projects", {
//         title: data.title,
//         description: data.description,
//         websiteLink: data.websiteLink,
//         language: selectedLanguages, // This is correctly sending array of language IDs
//         createdBy: data.createdBy,
//       });

//       if (response.status === 200) {
//         console.log("Created project:", response.data); // Debug log
//         toast.success("Project created successfully!");
//         onSuccess(response.data);
//         setSelectedLanguages([]); // Reset selected languages
//         onOpenChange(false); // Close dialog
//       }
//     } catch (error) {
//       console.error("Error creating project:", error); // Debug log
//       toast.error("Failed to create project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleLanguage = (languageId: number) => {
//     setSelectedLanguages(current =>
//       current.includes(languageId)
//         ? current.filter(id => id !== languageId)
//         : [...current, languageId]
//     );
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Submit Your Project</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* title */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Project Title</Label>
//             <Input id="title" name="title" required />
//           </div>

//           {/* description */}
//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               required
//               className="min-h-[100px]"
//             />
//           </div>

//           {/* languages */}
//           <div className="space-y-2">
//             <Label>Technologies</Label>
//             <Popover open={openLanguages} onOpenChange={setOpenLanguages}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={openLanguages}
//                   className="w-full justify-between"
//                 >
//                   {selectedLanguages.length === 0
//                     ? "Select technologies..."
//                     : `${selectedLanguages.length} selected`}
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-full p-0">
//                 <Command>
//                   <CommandInput placeholder="Search technologies..." />
//                   <CommandList>
//                     <CommandEmpty>No technology found.</CommandEmpty>
//                     <CommandGroup>
//                       {PROGRAMMING_LANGUAGES.map((language) => (
//                         <CommandItem
//                           key={language.id}
//                           onSelect={() => toggleLanguage(language.id)}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               selectedLanguages.includes(language.id)
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                           {language.name}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//           </div>

//           {/* website link */}
//           <div className="space-y-2">
//             <Label htmlFor="websiteLink">Website Link</Label>
//             <Input id="websiteLink" name="websiteLink" type="url" required />
//           </div>

//           {/* created by */}
//           <div className="space-y-2">
//             <Label htmlFor="createdBy">Created By</Label>
//             <Input id="createdBy" name="createdBy" type="text" required />
//           </div>

//           {/* submit button */}
//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? "Creating..." : "Create Project"}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateProjectDialog;

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";

interface Language {
  id: number;
  name: string;
}

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (newProject: any) => void;
}

const CreateProjectDialog = ({ open, onOpenChange, onSuccess }: CreateProjectDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);

  // Fetch languages when dialog opens
  useEffect(() => {
    if (open) {
      fetchLanguages();
    }
  }, [open]);

  const fetchLanguages = async () => {
    setLoadingLanguages(true);
    try {
      const response = await axiosInstance.get("/languages");
      if (response.status === 200) {
        setLanguages(response.data);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
      toast.error("Failed to load programming languages");
    } finally {
      setLoadingLanguages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await axiosInstance.post("/projects", {
        title: data.title,
        description: data.description,
        websiteLink: data.websiteLink,
        language: selectedLanguages,
        createdBy: data.createdBy,
      });

      if (response.status === 200) {
        console.log("Created project:", response.data);
        toast.success("Project created successfully!");
        onSuccess(response.data);
        setSelectedLanguages([]);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = (languageId: number) => {
    setSelectedLanguages(current =>
      current.includes(languageId)
        ? current.filter(id => id !== languageId)
        : [...current, languageId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Your Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Previous form fields remain the same */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Technologies</Label>
            <Popover open={openLanguages} onOpenChange={setOpenLanguages}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLanguages}
                  className="w-full justify-between"
                  disabled={loadingLanguages}
                >
                  {loadingLanguages
                    ? "Loading languages..."
                    : selectedLanguages.length === 0
                      ? "Select technologies..."
                      : `${selectedLanguages.length} selected`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search technologies..." />
                  <CommandList>
                    <CommandEmpty>No technology found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          key={language.id}
                          onSelect={() => toggleLanguage(language.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedLanguages.includes(language.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteLink">Website Link</Label>
            <Input id="websiteLink" name="websiteLink" type="url" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdBy">Created By</Label>
            <Input id="createdBy" name="createdBy" type="text" required />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;