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
  Loader2,
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
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [sections, setSections] = useState<Section[]>([]);

  const [files] = useState<FileNode[]>([
    { id: "1", name: "main.tex", type: "file" },
  ]);

  // Fetch project data from backend
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await graphqlRequest<
          GetProjectResponse,
          GetProjectVariables
        >(GET_PROJECT_QUERY, { id: projectId });

        if (data.project) {
          setProjectTitle(data.project.title);
          // Content is stored as JSON, extract the mainTex field
          const content = data.project.content;
          if (content && typeof content === 'object' && 'mainTex' in content) {
            setCode(String(content.mainTex));
          } else if (typeof content === 'string') {
            setCode(content);
          } else {
            setCode(getDefaultContent());
          }
        } else {
          setError("Project not found");
          setCode(getDefaultContent());
        }
      } catch (err: any) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Failed to load project");
        setCode(getDefaultContent());
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

  const getDefaultContent = () => {
    return `\\documentclass{article}
\\usepackage{graphicx} % Required for inserting images

\\title{${projectTitle}}
\\author{Your Name}
\\date{${new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}}

\\begin{document}

\\maketitle

\\section{Introduction}

\\section{Second Section}

\\section{Third Section}

\\end{document}`;
  };

  const saveProject = async () => {
    try {
      setSaving(true);

      // Backend expects content as JSON, so we wrap the string in an object
      const contentData = {
        mainTex: code,
        lastModified: new Date().toISOString(),
      };

      await graphqlRequest<UpdateProjectResponse, UpdateProjectVariables>(
        UPDATE_PROJECT_MUTATION,
        { id: projectId, content: contentData }
      );

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

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col bg-[#2b2d42]">
      {/* Top Toolbar */}
      <header className="bg-[#3d3557] border-b border-[#2b2d42] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Menu className="w-4 h-4 mr-2" />
            Menu
          </Button>
          <Link href="/projects">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <FolderOpen className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>

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

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Review
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Users className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <LayoutIcon className="w-4 h-4 mr-2" />
            Layout
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </header>

      {/* Secondary Toolbar */}
      <div className="bg-[#2b2d42] border-b border-[#3d3557] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-400 hover:bg-gray-700"
          >
            Code Editor
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:bg-gray-700"
          >
            Visual Editor
          </Button>
        </div>

        <div className="flex items-center gap-2 text-white text-sm">
          <span>Normal text</span>
          <Button
            variant="default"
            size="sm"
            className="bg-[#6c5ce7] hover:bg-[#5f4fd1] text-white"
          >
            🔄 Recompile
          </Button>
        </div>

        <div className="flex items-center gap-2 text-white text-sm">
          <span>67%</span>
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
                className="bg-[#2b2d42] border-r border-[#3d3557] overflow-y-auto"
                style={{ width: `${leftPanelWidth}px` }}
              >
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-white text-sm font-semibold mb-2">
                      {activeFile}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <button
                      onClick={() => setShowFileOutline(!showFileOutline)}
                      className="flex items-center gap-1 text-gray-400 text-xs mb-2 hover:text-white"
                    >
                      <ChevronDown className="w-3 h-3" />
                      File outline
                    </button>
                    <div className="space-y-1 text-sm">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          className="block w-full text-left px-2 py-1 text-gray-300 hover:bg-[#3d3557] rounded text-xs"
                          style={{ paddingLeft: `${section.level * 8}px` }}
                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Middle Panel - Code Editor */}
            <div
              className="flex-1 flex flex-col bg-[#1e1e2e]"
              style={{ width: `${middlePanelWidth}%` }}
            >
              <div className="flex-1 overflow-hidden">
                <div className="h-full flex">
                  {/* Line Numbers */}
                  <div className="bg-[#1e1e2e] text-gray-500 text-right pr-3 pl-2 py-4 text-sm font-mono select-none">
                    {(code || "").split("\n").map((_, index) => (
                      <div key={index} className="leading-6">
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code Area */}
                  <textarea
                    value={code}
                    onChange={handleCodeChange}
                    className="flex-1 bg-[#1e1e2e] text-white p-4 font-mono text-sm leading-6 resize-none outline-none"
                    spellCheck={false}
                    style={{
                      tabSize: 2,
                      whiteSpace: "pre",
                      overflowWrap: "normal",
                      overflowX: "auto",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - PDF Preview */}
            <div className="flex-1 bg-[#4a4a4a] flex items-center justify-center overflow-auto">
              <div className="bg-white shadow-2xl p-12 max-w-3xl mx-auto my-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">{projectTitle}</h1>
                    <p className="text-sm">
                      {code.match(/\\author\{([^}]+)\}/)?.[1] || "Author"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {code.match(/\\date\{([^}]+)\}/)?.[1] ||
                        new Date().toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                    </p>
                  </div>

                  <div className="space-y-4 mt-8">
                    {sections.map((section, index) => (
                      <div key={section.id}>
                        <h2 className="text-xl font-bold mb-2">
                          {index + 1} {section.title}
                        </h2>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-sm text-gray-500 mt-12">
                    1
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
