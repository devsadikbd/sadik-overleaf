"use client";

import { useState } from "react";
import { Download, FileText, Archive, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DownloadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectId: string;
  projectContent?: any;
}

type CompilationStatus = "idle" | "compiling" | "success" | "error";

export function DownloadProjectModal({
  isOpen,
  onClose,
  projectTitle,
  projectId,
  projectContent,
}: DownloadProjectModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [compilationStatus, setCompilationStatus] = useState<CompilationStatus>("idle");
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setCompilationStatus("compiling");
    setCompilationProgress(0);
    setErrorMessage("");

    try {
      // Simulate compilation progress
      const progressInterval = setInterval(() => {
        setCompilationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Call backend compilation service
      const response = await fetch("/api/compile/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          projectId,
          content: projectContent?.mainTex || "",
        }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error("Compilation service unavailable. Please try again later.");
      }

      // Get the PDF blob
      const blob = await response.blob();
      setCompilationProgress(100);
      setCompilationStatus("success");

      // Download the PDF
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Close modal after successful download
      setTimeout(() => {
        onClose();
        setCompilationStatus("idle");
        setCompilationProgress(0);
      }, 1500);
    } catch (error) {
      console.error("Failed to compile PDF:", error);
      setCompilationStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to compile PDF. Backend compilation service is not available."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSource = () => {
    try {
      // Extract LaTeX source code
      const latexContent = projectContent?.mainTex || "";

      // Create a blob with the LaTeX content
      const blob = new Blob([latexContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectTitle}.tex`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error("Failed to download source:", error);
    }
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      // TODO: Implement ZIP download with all project files from backend
      console.log("Downloading ZIP for project:", projectId);

      // Simulate download
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just download the main.tex file
      handleDownloadSource();
    } catch (error) {
      console.error("Failed to download ZIP:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Project
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Project Info */}
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-900">{projectTitle}</p>
          </div>

          {/* Compilation Status */}
          {compilationStatus !== "idle" && (
            <div className={`p-4 rounded-lg ${
              compilationStatus === "compiling" ? "bg-blue-50 border border-blue-200" :
              compilationStatus === "success" ? "bg-green-50 border border-green-200" :
              "bg-red-50 border border-red-200"
            }`}>
              <div className="flex items-center gap-3">
                {compilationStatus === "compiling" && (
                  <>
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Compiling LaTeX...</p>
                      <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${compilationProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-blue-600 mt-1">{compilationProgress}% complete</p>
                    </div>
                  </>
                )}
                {compilationStatus === "success" && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-medium text-green-900">PDF compiled successfully!</p>
                  </>
                )}
                {compilationStatus === "error" && (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900">Compilation Failed</p>
                      <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Download Options */}
          <div className="space-y-3">
            {/* PDF */}
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading || compilationStatus === "compiling"}
              className={`w-full flex items-center gap-3 p-4 border rounded-lg transition-colors text-left ${
                isDownloading || compilationStatus === "compiling"
                  ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                {compilationStatus === "compiling" ? (
                  <Loader2 className="w-5 h-5 text-red-600 animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">PDF Document</h3>
                <p className="text-sm text-gray-500">
                  {compilationStatus === "compiling" 
                    ? "Compiling with LaTeX backend..." 
                    : "Download compiled PDF file"}
                </p>
              </div>
              {compilationStatus !== "compiling" && (
                <Download className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {/* Source Files */}
            <button
              onClick={handleDownloadSource}
              disabled={compilationStatus === "compiling"}
              className={`w-full flex items-center gap-3 p-4 border rounded-lg transition-colors text-left ${
                compilationStatus === "compiling"
                  ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Source (.tex)</h3>
                <p className="text-sm text-gray-500">
                  Download LaTeX source file
                </p>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>

            {/* ZIP Archive */}
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading || compilationStatus === "compiling"}
              className={`w-full flex items-center gap-3 p-4 border rounded-lg transition-colors text-left ${
                isDownloading || compilationStatus === "compiling"
                  ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Archive className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">ZIP Archive</h3>
                <p className="text-sm text-gray-500">
                  Download all project files
                </p>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={compilationStatus === "compiling"}>
            {compilationStatus === "compiling" ? "Compiling..." : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
