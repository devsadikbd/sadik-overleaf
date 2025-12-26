"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFile: (fileName: string) => void;
}

export function NewFileModal({
  isOpen,
  onClose,
  onCreateFile,
}: NewFileModalProps) {
  const [fileName, setFileName] = useState("");

  const handleCreate = () => {
    let name = fileName.trim();
    if (name) {
      // Add .tex extension if not present
      if (
        !name.endsWith(".tex") &&
        !name.endsWith(".txt") &&
        !name.endsWith(".bib")
      ) {
        name = name + ".tex";
      }
      onCreateFile(name);
      setFileName("");
      onClose();
    }
  };

  const handleClose = () => {
    setFileName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New File</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Input
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreate();
              }
            }}
            autoFocus
          />
          <p className="text-sm text-gray-500">
            Enter a name for your new file. The .tex extension will be added
            automatically if not specified.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!fileName.trim()}
            className="bg-[#6c5ce7] hover:bg-[#5f4fd1] text-white"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
