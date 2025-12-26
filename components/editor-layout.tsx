"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  FolderOpen,
  Download,
  Upload,
  Eye,
  Users,
  History,
  Layout as LayoutIcon,
  Printer,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Loader2,
  MessageCircle,
  Copy,
  FileDown,
  Plus,
  Minus,
  ChevronLeft,
  File,
} from "lucide-react";
import { graphqlRequest } from "@/lib/keystone";
import {
  GET_PROJECT_QUERY,
  UPDATE_PROJECT_MUTATION,
  type GetProjectResponse,
  type GetProjectVariables,
  type UpdateProjectResponse,
  type UpdateProjectVariables,
} from "@/lib/graphql/queries";
import { ShareProjectModal } from "@/components/share-project-modal";
import { DownloadProjectModal } from "@/components/download-project-modal";
import { NewFolderModal } from "@/components/new-folder-modal";
import { NewFileModal } from "@/components/new-file-modal";
import { LatexEditor } from "@/components/latex-editor";

interface EditorLayoutProps {
  projectId: string;
}

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  expanded?: boolean;
}

interface Section {
  id: string;
  title: string;
  level: number;
  line: number;
}

export function EditorLayout({ projectId }: EditorLayoutProps) {
  const [projectTitle, setProjectTitle] = useState("Loading...");
  const [leftPanelWidth, setLeftPanelWidth] = useState(200);
  const [middlePanelWidth, setMiddlePanelWidth] = useState(50); // percentage
  const [showFileOutline, setShowFileOutline] = useState(true);
  const [activeFile, setActiveFile] = useState("main.tex");
  const [code, setCode] = useState(`\\documentclass{article}
\\usepackage{graphicx} % Required for inserting images

\\title{Test}
\\author{Ashiqur Rahman}
\\date{October 2024}

\\begin{document}

\\maketitle

\\section{Introduction}

\\section{Second Section}

\\section{Third Section}

\\end{document}`);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editorMode, setEditorMode] = useState<"code" | "visual">("code");
  const [zoomLevel, setZoomLevel] = useState(67);
  const [isCompiling, setIsCompiling] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sections, setSections] = useState<Section[]>([]);

  const [files, setFiles] = useState<FileNode[]>([
    { id: "1", name: "main.tex", type: "file" },
  ]);

  // Toggle folder expanded/collapsed
  const toggleFolder = (folderId: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === folderId && file.type === "folder"
          ? { ...file, expanded: !file.expanded }
          : file
      )
    );
  };

  // Handle creating a new folder
  const handleCreateFolder = (folderName: string) => {
    const newFolder: FileNode = {
      id: String(Date.now()),
      name: folderName,
      type: "folder",
      children: [],
      expanded: true,
    };
    // Add folder at the beginning
    setFiles((prev) => [newFolder, ...prev]);
  };

  // Handle creating a new file
  const handleCreateFile = (fileName: string) => {
    const newFile: FileNode = {
      id: String(Date.now()),
      name: fileName,
      type: "file",
    };
    // Add file to the list
    setFiles((prev) => [...prev, newFile]);
    // Set as active file
    setActiveFile(fileName);
  };

  // Fetch project data from backend
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await graphqlRequest<GetProjectResponse>(
          GET_PROJECT_QUERY,
          { id: projectId }
        );

        console.log("Fetched project data:", data);
        console.log("Content from backend:", data.project?.content);

        if (data.project) {
          const title = data.project.title;
          setProjectTitle(title);
          // Content is stored as JSON, extract the mainTex field
          const content = data.project.content;
          let mainTex = "";

          if (content && typeof content === "object" && "mainTex" in content) {
            mainTex = String(content.mainTex);
          } else if (typeof content === "string") {
            mainTex = content;
          }

          // Fix corrupted template literal content from previous buggy saves
          if (
            mainTex &&
            (mainTex.includes("${projectTitle}") ||
              mainTex.includes("${new Date()"))
          ) {
            const currentDate = new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            });
            mainTex = mainTex
              .replace(/\$\{projectTitle\}/g, title)
              .replace(
                /\$\{new Date\(\)\.toLocaleDateString\([^)]*\)\}/g,
                currentDate
              )
              .replace(
                /\$\{new Date\(\)\.toLocaleDateString\("en-US", \{\s*month: "long",\s*year: "numeric",\s*\}\)\}/g,
                currentDate
              );
            console.log("Fixed corrupted content:", mainTex);
          }

          if (mainTex) {
            setCode(mainTex);
          } else {
            // Generate default content with the actual project title
            setCode(generateDefaultContent(title));
          }
        } else {
          setError("Project not found");
          setCode(generateDefaultContent("My Document"));
        }
      } catch (err: any) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Failed to load project");
        setCode(generateDefaultContent("My Document"));
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // Auto-save functionality with debounce
  useEffect(() => {
    if (loading || !code || typeof code !== "string") return;

    const timeoutId = setTimeout(() => {
      saveProject();
    }, 2000); // Auto-save after 2 seconds of no typing

    return () => clearTimeout(timeoutId);
  }, [code, loading]);

  // Helper function to generate default LaTeX content with a given title
  const generateDefaultContent = (title: string) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      "\\documentclass{article}\n" +
      "\\usepackage{graphicx} % Required for inserting images\n\n" +
      "\\title{" +
      title +
      "}\n" +
      "\\author{Your Name}\n" +
      "\\date{" +
      currentDate +
      "}\n\n" +
      "\\begin{document}\n\n" +
      "\\maketitle\n\n" +
      "\\section{Introduction}\n\n" +
      "\\section{Second Section}\n\n" +
      "\\section{Third Section}\n\n" +
      "\\end{document}"
    );
  };

  // Legacy function for backwards compatibility
  const getDefaultContent = () => {
    const title = projectTitle !== "Loading..." ? projectTitle : "My Document";
    return generateDefaultContent(title);
  };

  const saveProject = async () => {
    try {
      setSaving(true);

      // Backend expects content as JSON, so we wrap the string in an object
      const contentData = {
        mainTex: code,
        lastModified: new Date().toISOString(),
      };

      await graphqlRequest<UpdateProjectResponse>(UPDATE_PROJECT_MUTATION, {
        id: projectId,
        content: contentData,
      });

      setLastSaved(new Date());
    } catch (err: any) {
      console.error("Failed to save project:", err);
      // Don't show error to user for auto-save failures
    } finally {
      setSaving(false);
    }
  };

  const handleManualSave = () => {
    saveProject();
  };

  // Handle recompile - triggers a re-render of the preview
  const handleRecompile = async () => {
    setIsCompiling(true);
    // Simulate compilation delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Force re-parse sections
    const lines = code.split("\n");
    const foundSections: Section[] = [];
    lines.forEach((line, index) => {
      const sectionMatch = line.match(/\\section\{([^}]+)\}/);
      if (sectionMatch) {
        foundSections.push({
          id: String(foundSections.length + 1),
          title: sectionMatch[1],
          level: 1,
          line: index + 1,
        });
      }
    });
    setSections(foundSections);
    setIsCompiling(false);
  };

  // Handle print - only prints the PDF preview
  const handlePrint = () => {
    const printContent = document.getElementById("pdf-preview");
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Extract title, author, date from code
    const title = code.match(/\\title\{([^}]+)\}/)?.[1] || projectTitle;
    const author = code.match(/\\author\{([^}]+)\}/)?.[1] || "Author";
    const date =
      code.match(/\\date\{([^}]+)\}/)?.[1] ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            @page {
              margin: 1in;
              size: A4;
            }
            body {
              font-family: 'Times New Roman', Times, serif;
              line-height: 1.6;
              color: #000;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
            }
            .title {
              text-align: center;
              margin-bottom: 10px;
            }
            .title h1 {
              font-size: 24px;
              font-weight: bold;
              margin: 0;
            }
            .author {
              text-align: center;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .date {
              text-align: center;
              font-size: 14px;
              color: #666;
              margin-bottom: 40px;
            }
            .section {
              margin-top: 30px;
            }
            .section h2 {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="title">
            <h1>${title}</h1>
          </div>
          <div class="author">${author}</div>
          <div class="date">${date}</div>
          ${sections
            .map(
              (section, index) => `
            <div class="section">
              <h2>${index + 1} ${section.title}</h2>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Handle file upload
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".tex,.txt";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setCode(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Handle zoom
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 25));
  };

  // Parse sections from LaTeX code
  useEffect(() => {
    if (!code || typeof code !== "string") return;

    const lines = code.split("\n");
    const foundSections: Section[] = [];

    lines.forEach((line, index) => {
      const sectionMatch = line.match(/\\section\{([^}]+)\}/);
      if (sectionMatch) {
        foundSections.push({
          id: String(foundSections.length + 1),
          title: sectionMatch[1],
          level: 1,
          line: index + 1,
        });
      }
    });

    setSections(foundSections);
  }, [code]);

  return (
    <div className="h-screen flex flex-col bg-[#2b2d42]">
      {/* Top Toolbar */}
      <header className="bg-[#3d3557] border-b border-[#2b2d42] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Menu className="w-4 h-4 mr-1" />
            Menu
          </Button>

          {/* Upgrade Button */}
          <Button
            size="sm"
            className="bg-[#6c5ce7] hover:bg-[#5f4fd1] text-white"
          >
            Upgrade
          </Button>

          {/* Home Button */}
          <Link href="/projects">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <Home className="w-4 h-4" />
            </Button>
          </Link>

          {/* File Actions */}
          <div className="flex items-center gap-1 border-l border-gray-600 pl-2 ml-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-2"
              onClick={() => setShowNewFolderModal(true)}
              title="New Folder"
            >
              <FolderOpen className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-2"
              onClick={() => setShowDownloadModal(true)}
              title="Download"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-2"
              onClick={handleFileUpload}
              title="Upload"
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Project Title - Center */}
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{projectTitle}</span>
          {saving && (
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Saving...
            </span>
          )}
          {!saving && lastSaved && (
            <span className="text-gray-400 text-sm">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Eye className="w-4 h-4 mr-1" />
            Review
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
            onClick={() => setShowShareModal(true)}
          >
            <Users className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button
            variant="default"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <History className="w-4 h-4 mr-1" />
            History
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
            onClick={() => setShowFileOutline(!showFileOutline)}
          >
            <LayoutIcon className="w-4 h-4 mr-1" />
            Layout
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-1" />
            Print
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>
      </header>

      {/* Secondary Toolbar */}
      <div className="bg-[#2b2d42] border-b border-[#3d3557] px-4 py-1.5 flex items-center justify-between">
        {/* Left - Editor Mode Toggle */}
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            className={
              editorMode === "code"
                ? "bg-[#6c5ce7] hover:bg-[#5f4fd1] text-white"
                : "bg-transparent text-gray-300 hover:bg-gray-700"
            }
            onClick={() => setEditorMode("code")}
          >
            Code Editor
          </Button>
          <Button
            size="sm"
            className={
              editorMode === "visual"
                ? "bg-[#6c5ce7] hover:bg-[#5f4fd1] text-white"
                : "bg-transparent text-gray-300 hover:bg-gray-700"
            }
            onClick={() => setEditorMode("visual")}
          >
            Visual Editor
          </Button>
        </div>

        {/* Center - Text Style & Recompile */}
        <div className="flex items-center gap-3 text-white text-sm">
          <span className="text-gray-300">Normal text</span>
          <div className="flex items-center">
            <Button
              size="sm"
              className="bg-[#6c5ce7] hover:bg-[#5f4fd1] text-white"
              onClick={handleRecompile}
              disabled={isCompiling}
            >
              {isCompiling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Compiling...
                </>
              ) : (
                <>🔄 Recompile</>
              )}
            </Button>
            
          </div>
        </div>

        {/* Right - PDF Actions & Zoom */}
        <div className="flex items-center gap-2 text-white text-sm">
          {/* Copy & Download PDF */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700 px-2"
            title="Copy PDF"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700 px-2"
            title="Download PDF"
            onClick={() => setShowDownloadModal(true)}
          >
            <FileDown className="w-4 h-4" />
          </Button>

          {/* Page Navigation */}
          <div className="flex items-center gap-1 border-l border-gray-600 pl-2 ml-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-1"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-1"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
            <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">
              {currentPage}
            </span>
            <span className="text-gray-400">/ {totalPages}</span>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border-l border-gray-600 pl-2 ml-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-1"
              onClick={handleZoomOut}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 px-1"
              onClick={handleZoomIn}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <span className="text-gray-300 text-xs">{zoomLevel}%</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center bg-[#1e1e2e]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-2" />
              <p className="text-gray-400">Loading project...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center bg-[#1e1e2e]">
            <div className="text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <Link href="/projects">
                <Button variant="outline" size="sm">
                  Back to Projects
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Left Sidebar - File Outline */}
            {showFileOutline && (
              <aside
                className="bg-[#2b2d42] border-r border-[#3d3557] overflow-y-auto flex flex-col"
                style={{ width: `${leftPanelWidth}px` }}
              >
                {/* Top Action Icons */}
                <div className="flex items-center gap-1 p-2 border-b border-[#3d3557]">
                  <button
                    className="p-2 text-gray-300 hover:bg-[#3d3557] rounded"
                    title="New File"
                    onClick={() => setShowNewFileModal(true)}
                  >
                    <File className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-300 hover:bg-[#3d3557] rounded"
                    title="New Folder"
                    onClick={() => setShowNewFolderModal(true)}
                  >
                    <FolderOpen className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-300 hover:bg-[#3d3557] rounded"
                    title="Upload"
                    onClick={handleFileUpload}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>

                {/* Files Section */}
                <div className="flex-1 overflow-y-auto">
                  <div>
                    {files.map((file) => (
                      <div key={file.id}>
                        {file.type === "folder" ? (
                          <>
                            {/* Folder Header - Purple when expanded */}
                            <button
                              className={`flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm font-medium ${
                                file.expanded
                                  ? "bg-gradient-to-r from-[#6c5ce7] to-[#8b7cf7] text-white"
                                  : "text-gray-300 hover:bg-[#3d3557]"
                              }`}
                              onClick={() => toggleFolder(file.id)}
                            >
                              {file.expanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              <FolderOpen
                                className={`w-5 h-5 ${
                                  file.expanded
                                    ? "text-white"
                                    : "text-yellow-400"
                                }`}
                              />
                              <span>{file.name}</span>
                            </button>
                            {/* Folder Contents - Light background */}
                            {file.expanded && file.children && (
                              <div className="bg-white">
                                {file.children.map((child) => (
                                  <button
                                    key={child.id}
                                    className={`flex items-center gap-3 w-full text-left px-6 py-3 text-sm border-b border-gray-100 ${
                                      activeFile === child.name
                                        ? "bg-purple-50 text-purple-700"
                                        : "text-gray-400 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setActiveFile(child.name)}
                                  >
                                    <File className="w-5 h-5 text-gray-300" />
                                    <span>{child.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            className={`flex items-center gap-3 w-full text-left px-3 py-3 text-sm bg-white border-b border-gray-100 ${
                              activeFile === file.name
                                ? "bg-purple-50 text-purple-700"
                                : "text-gray-400 hover:bg-gray-50"
                            }`}
                            onClick={() => setActiveFile(file.name)}
                          >
                            <File className="w-5 h-5 text-gray-300" />
                            {file.name}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resize Handle */}
                <div className="px-2 py-1 flex items-center justify-center cursor-row-resize hover:bg-[#3d3557]">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  </div>
                </div>

                {/* File Outline Section */}
                <div className="flex-1 p-2 overflow-y-auto">
                  <button className="flex items-center gap-1 text-gray-400 text-xs mb-2 hover:text-white w-full">
                    <ChevronDown className="w-3 h-3" />
                    <span>File outline</span>
                  </button>
                  <div className="space-y-0.5">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        className="block w-full text-left px-3 py-1 text-gray-300 hover:bg-[#3d3557] rounded text-sm"
                        style={{ paddingLeft: `${8 + section.level * 12}px` }}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            )}

            {/* Middle Panel - Code Editor */}
            <div className="flex-1 flex flex-col bg-[#1e1e2e] min-w-0 relative">
              <LatexEditor value={code} onChange={setCode} />

              {/* Panel Navigation Arrows */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10">
                <button
                  className="w-6 h-6 bg-[#6c5ce7] hover:bg-[#5f4fd1] rounded-l flex items-center justify-center text-white"
                  title="Expand Editor"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  className="w-6 h-6 bg-[#6c5ce7] hover:bg-[#5f4fd1] rounded-l flex items-center justify-center text-white"
                  title="Collapse Editor"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Panel - PDF Preview */}
            <div className="flex-1 bg-[#525252] flex justify-center overflow-auto min-w-0 relative py-4">
              <div
                id="pdf-preview"
                className="bg-white shadow-xl min-h-[842px] w-[595px] p-16 transition-transform origin-top"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* Document Content */}
                <div className="font-serif text-black">
                  {/* Title Section */}
                  <div className="text-center mb-8 pt-8">
                    <h1 className="text-2xl font-bold mb-2">
                      {(() => {
                        const extracted = code.match(/\\title\{([^}]+)\}/)?.[1];
                        if (!extracted || extracted.includes("${"))
                          return projectTitle;
                        return extracted;
                      })()}
                    </h1>
                    <p className="text-sm mb-1">
                      {(() => {
                        const extracted =
                          code.match(/\\author\{([^}]+)\}/)?.[1];
                        if (!extracted || extracted.includes("${"))
                          return "Author";
                        return extracted;
                      })()}
                    </p>
                    <p className="text-sm text-gray-700">
                      {(() => {
                        const extracted = code.match(/\\date\{([^}]+)\}/)?.[1];
                        if (
                          !extracted ||
                          extracted.includes("${") ||
                          extracted.includes("new Date")
                        ) {
                          return new Date().toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          });
                        }
                        return extracted;
                      })()}
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-6 mt-12">
                    {sections.map((section, index) => (
                      <div key={section.id} className="mb-4">
                        <h2 className="text-lg font-bold">
                          {index + 1}&nbsp;&nbsp;{section.title}
                        </h2>
                      </div>
                    ))}
                  </div>

                  {/* Page Number */}
                  <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-gray-600">
                    1
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Share Project Modal */}
      <ShareProjectModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        projectTitle={projectTitle}
        projectId={projectId}
      />

      {/* Download Project Modal */}
      <DownloadProjectModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        projectTitle={projectTitle}
        projectId={projectId}
        projectContent={{ mainTex: code }}
      />

      {/* New Folder Modal */}
      <NewFolderModal
        isOpen={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
        onCreateFolder={handleCreateFolder}
      />

      {/* New File Modal */}
      <NewFileModal
        isOpen={showNewFileModal}
        onClose={() => setShowNewFileModal(false)}
        onCreateFile={handleCreateFile}
      />
    </div>
  );
}
