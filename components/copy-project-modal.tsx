"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CopyProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (newName: string) => Promise<void>;
  originalProjectTitle: string;
}

export function CopyProjectModal({
  open,
  onOpenChange,
  onConfirm,
  originalProjectTitle,
}: CopyProjectModalProps) {
  const [newName, setNewName] = useState(`${originalProjectTitle}(Copy)`);
  const [isCopying, setIsCopying] = useState(false);

  // Update the new name when modal opens with a different project
  useState(() => {
    if (open && originalProjectTitle) {
      setNewName(`${originalProjectTitle}(Copy)`);
    }
  });

  const handleConfirm = async () => {
    if (!newName.trim()) return;

    setIsCopying(true);
    try {
      await onConfirm(newName);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to copy project:", error);
    } finally {
      setIsCopying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newName.trim()) {
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Copy Project</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="grid gap-2">
            <Label htmlFor="new-name">New Name</Label>
            <Input
              id="new-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={isCopying}
              className="bg-gray-50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCopying}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!newName.trim() || isCopying}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isCopying ? "Copying..." : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
