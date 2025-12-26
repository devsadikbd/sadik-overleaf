"use client";

import { useState, useEffect } from "react";
import { Users, Copy, Check } from "lucide-react";
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

interface ShareProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectId: string;
}

export function ShareProjectModal({
  isOpen,
  onClose,
  projectTitle,
  projectId,
}: ShareProjectModalProps) {
  const [email, setEmail] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState("");

  // Set share link on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareLink(`${window.location.origin}/editor/${projectId}`);
    }
  }, [projectId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShareByEmail = async () => {
    if (!email.trim()) return;

    setIsSharing(true);
    try {
      // TODO: Implement backend API call to share project
      console.log("Sharing project with:", email);

      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEmail("");
      onClose();
    } catch (error) {
      console.error("Failed to share project:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email.trim()) {
      handleShareByEmail();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Share Project
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Project Info */}
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-900">{projectTitle}</p>
          </div>

          {/* Share by Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Share with collaborator</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                onClick={handleShareByEmail}
                disabled={!email.trim() || isSharing}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSharing ? "Sharing..." : "Share"}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              They'll receive an email with access to this project
            </p>
          </div>

          {/* Share Link */}
          <div className="space-y-2">
            <Label htmlFor="share-link">Or share via link</Label>
            <div className="flex gap-2">
              <Input
                id="share-link"
                value={shareLink}
                readOnly
                className="flex-1 bg-gray-50"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="gap-2"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Anyone with this link can view the project
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
