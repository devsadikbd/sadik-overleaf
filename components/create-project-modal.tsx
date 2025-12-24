"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (projectName: string) => Promise<void>;
  isAuthenticated?: boolean;
}

export function CreateProjectModal({
  open,
  onOpenChange,
  onCreateProject,
  isAuthenticated = true,
}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!projectName.trim() || !isAuthenticated) return;

    setIsCreating(true);
    try {
      await onCreateProject(projectName);
      setProjectName("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && projectName.trim() && isAuthenticated) {
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          {!isAuthenticated && (
            <DialogDescription className="text-red-600">
              You must be logged in to create a project. Please{" "}
              <Link href="/login" className="underline font-medium">
                login
              </Link>{" "}
              or{" "}
              <Link href="/signup" className="underline font-medium">
                sign up
              </Link>
              .
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={isCreating || !isAuthenticated}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!projectName.trim() || isCreating || !isAuthenticated}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Standalone button component that can trigger the modal
interface CreateProjectButtonProps {
  onCreateProject: (projectName: string) => Promise<void>;
  variant?: "sidebar" | "main";
  isAuthenticated?: boolean;
}

export function CreateProjectButton({
  onCreateProject,
  variant = "sidebar",
  isAuthenticated = true,
}: CreateProjectButtonProps) {
  const [open, setOpen] = useState(false);

  if (variant === "sidebar") {
    return (
      <>
        <Button
          className="w-full bg-[#7c3fed] hover:bg-[#6a35d4] text-white font-medium"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
        <CreateProjectModal
          open={open}
          onOpenChange={setOpen}
          onCreateProject={onCreateProject}
          isAuthenticated={isAuthenticated}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gray-900 hover:bg-gray-800 text-white px-6"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </Button>
      <CreateProjectModal
        open={open}
        onOpenChange={setOpen}
        onCreateProject={onCreateProject}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}
