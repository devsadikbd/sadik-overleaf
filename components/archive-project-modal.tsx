"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ArchiveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
}

export function ArchiveProjectModal({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
}: ArchiveProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Archive Project
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            You are about to archive the following project:
          </p>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">
              {projectTitle}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="px-6">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-6 bg-red-600 hover:bg-red-700 text-white"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
