"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { OverleafWordmark } from "@/components/overleaf-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateProjectButton } from "@/components/create-project-modal";
import { TrashProjectModal } from "@/components/trash-project-modal";
import { CopyProjectModal } from "@/components/copy-project-modal";
import { ArchiveProjectModal } from "@/components/archive-project-modal";
import {
  Plus,
  FolderOpen,
  Users,
  Archive,
  ShoppingCart,
  Search,
  Share2,
  Download,
  Copy,
  FileText,
  Trash2,
  Loader2,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { graphqlRequest, logout } from "@/lib/keystone";
import {
  GET_PROJECTS_QUERY,
  GET_MY_PROJECTS_QUERY,
  CREATE_PROJECT_MUTATION,
  COPY_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  ARCHIVE_PROJECT_MUTATION,
  GET_CURRENT_USER_QUERY,
  type Project as ProjectType,
  type CreateProjectVariables,
  type CreateProjectResponse,
  type CopyProjectVariables,
  type CopyProjectResponse,
  type DeleteProjectVariables,
  type DeleteProjectResponse,
  type ArchiveProjectVariables,
  type ArchiveProjectResponse,
  type CurrentUserResponse,
} from "@/lib/graphql/queries";

interface Project {
  id: string;
  title: string;
  owner: string;
  lastModified: string;
  modifiedBy: string;
}

export function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(
    new Set()
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [projectToCopy, setProjectToCopy] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [projectToArchive, setProjectToArchive] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Fetch current user and projects from backend
  useEffect(() => {
    // Initial check
    checkAuthentication();
    fetchProjects();

    // Re-check when window regains focus or becomes visible
    const handleFocus = () => {
      console.log("Window focused, checking auth...");
      checkAuthentication();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Page visible, checking auth...");
        checkAuthentication();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const checkAuthentication = async () => {
    try {
      const data = await graphqlRequest<CurrentUserResponse>(
        GET_CURRENT_USER_QUERY
      );

      console.log("Authentication check result:", data);

      if (data?.authenticatedItem) {
        setIsAuthenticated(true);
        setCurrentUser(data.authenticatedItem);
        console.log("User authenticated:", data.authenticatedItem);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        console.log("User not authenticated");
      }
    } catch (err: any) {
      console.error("Failed to check authentication:", err);
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use GET_MY_PROJECTS_QUERY to fetch only the authenticated user's projects
      const data = await graphqlRequest<{
        authenticatedItem: {
          id: string;
          name: string;
          email: string;
          projects: ProjectType[];
        } | null;
      }>(GET_MY_PROJECTS_QUERY);

      // Check if user is authenticated
      if (!data.authenticatedItem || !data.authenticatedItem.projects) {
        setProjects([]);
        return;
      }

      // Ensure projects is an array
      const projectsArray = Array.isArray(data.authenticatedItem.projects)
        ? data.authenticatedItem.projects
        : [];

      // Transform backend data to component format
      const transformedProjects: Project[] = projectsArray.map((project) => ({
        id: project.id,
        title: project.title,
        owner: project.owner?.name || "Unknown",
        lastModified: formatDate(project.updatedAt),
        modifiedBy: project.owner?.name || "Unknown",
      }));

      setProjects(transformedProjects);
    } catch (err: any) {
      console.error("Failed to fetch projects:", err);
      setError(err.message || "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date to relative time
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "a few seconds ago";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
  };

  const handleCreateProject = async (projectName: string) => {
    try {
      const data = await graphqlRequest<
        CreateProjectResponse,
        CreateProjectVariables
      >(CREATE_PROJECT_MUTATION, { title: projectName });

      // Add the new project to the list
      const newProject: Project = {
        id: data.createProject.id,
        title: data.createProject.title,
        owner: data.createProject.owner?.name || "Unknown",
        lastModified: formatDate(data.createProject.createdAt),
        modifiedBy: data.createProject.owner?.name || "Unknown",
      };

      setProjects([newProject, ...projects]);
    } catch (err: any) {
      console.error("Failed to create project:", err);
      throw new Error(err.message || "Failed to create project");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (err: any) {
      console.error("Failed to logout:", err);
    }
  };

  const handleCopyClick = (projectId: string, projectTitle: string) => {
    setProjectToCopy({ id: projectId, title: projectTitle });
    setCopyModalOpen(true);
  };

  const handleCopyConfirm = async (newName: string) => {
    if (!projectToCopy) return;

    try {
      const data = await graphqlRequest<
        CopyProjectResponse,
        CopyProjectVariables
      >(COPY_PROJECT_MUTATION, { id: projectToCopy.id });

      // Add the copied project to the list
      const copiedProject: Project = {
        id: data.copyProject.id,
        title: data.copyProject.title,
        owner: data.copyProject.owner?.name || "Unknown",
        lastModified: formatDate(data.copyProject.createdAt),
        modifiedBy: data.copyProject.owner?.name || "Unknown",
      };

      setProjects([copiedProject, ...projects]);
      setProjectToCopy(null);
    } catch (err: any) {
      console.error("Failed to copy project:", err);
      throw new Error(err.message || "Failed to copy project");
    }
  };

  const handleDeleteClick = (projectId: string, projectTitle: string) => {
    setProjectToDelete({ id: projectId, title: projectTitle });
    setTrashModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      await graphqlRequest<DeleteProjectResponse, DeleteProjectVariables>(
        DELETE_PROJECT_MUTATION,
        { id: projectToDelete.id }
      );

      // Remove the project from the list
      setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    } catch (err: any) {
      console.error("Failed to delete project:", err);
      throw new Error(err.message || "Failed to delete project");
    }
  };

  const handleArchiveClick = (projectId: string, projectTitle: string) => {
    setProjectToArchive({ id: projectId, title: projectTitle });
    setArchiveModalOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (!projectToArchive) return;

    try {
      await graphqlRequest<ArchiveProjectResponse, ArchiveProjectVariables>(
        ARCHIVE_PROJECT_MUTATION,
        { id: projectToArchive.id }
      );

      // Remove the archived project from the list
      setProjects(projects.filter((p) => p.id !== projectToArchive.id));
      setProjectToArchive(null);
    } catch (err: any) {
      console.error("Failed to archive project:", err);
      throw new Error(err.message || "Failed to archive project");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProject = (id: string) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProjects(newSelected);
  };

  const toggleAll = () => {
    if (selectedProjects.size === filteredProjects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(filteredProjects.map((p) => p.id)));
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-[#2d2546] text-white p-6 flex flex-col overflow-y-auto">
        <div className="mb-8">
          <Link href="/#" className="flex items-center gap-2">
            <OverleafWordmark variant="white" className="h-6" />
          </Link>
        </div>

        <CreateProjectButton
          onCreateProject={handleCreateProject}
          variant="sidebar"
          isAuthenticated={isAuthenticated}
        />

        <nav className="space-y-1 mb-6 mt-6">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#3d3254] text-white"
          >
            <FolderOpen className="w-5 h-5" />
            <span>All Projects</span>
          </Link>

          <Link
            href="/projects/your-projects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#3d3254] hover:text-white transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Your Projects</span>
          </Link>

          <Link
            href="/projects/shared"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#3d3254] hover:text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Shared With You</span>
          </Link>

          <Link
            href="/projects/archived"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#3d3254] hover:text-white transition-colors"
          >
            <Archive className="w-5 h-5" />
            <span>Archived Projects</span>
          </Link>

          <Link
            href="/projects/orders"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#3d3254] hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>My Orders</span>
          </Link>
        </nav>

        <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
          <p className="text-[#2d2546] font-semibold mb-3">
            You are on the
            <br />
            free plan
          </p>
          <Link href="/pricing">
            <Button className="bg-[#2d2546] hover:bg-[#1f1a32] text-white px-6">
              Upgrade
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Home
            </Link>
            <div className="relative">
              <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                Products
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <Link
              href="/resources"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Resources
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && currentUser ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm text-gray-700 font-medium">
                    {currentUser.name}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {currentUser.name && currentUser.name.length > 0
                      ? currentUser.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1 overflow-y-auto">
          {loading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-6">
                <svg
                  className="w-32 h-32 text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Failed to Load Projects
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button
                onClick={fetchProjects}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Try Again
              </Button>
            </div>
          ) : filteredProjects.length === 0 && searchQuery === "" ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-6">
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44 120C43.6496 120.002 43.3048 119.913 43 119.74L25 109.74C24.6922 109.566 24.4362 109.313 24.258 109.007C24.0799 108.701 23.9861 108.354 23.9861 108C23.9861 107.646 24.0799 107.299 24.258 106.993C24.4362 106.687 24.6922 106.434 25 106.26L43 96.26C43.2478 96.1159 43.5238 96.0267 43.8091 95.9986C44.0945 95.9704 44.3825 96.0039 44.6538 96.0969C44.925 96.1898 45.1731 96.34 45.3812 96.5372C45.5893 96.7345 45.7526 96.9742 45.86 97.24C47.2615 100.655 47.9882 104.309 48 108C47.989 111.689 47.2693 115.342 45.88 118.76C45.7274 119.132 45.4664 119.449 45.1311 119.67C44.7958 119.891 44.4016 120.006 44 120ZM30 108L42.8 115.12C43.5517 112.82 43.9562 110.42 44 108C44.0001 105.586 43.636 103.186 42.92 100.88L30 108Z"
                    fill="#6F47AE"
                  />
                  <path
                    d="M118 120H44C43.6724 120 43.3497 119.921 43.0602 119.767C42.7708 119.614 42.5235 119.391 42.34 119.12C42.1542 118.847 42.0387 118.533 42.0038 118.205C41.9689 117.877 42.0157 117.546 42.14 117.24C43.3483 114.308 43.9799 111.171 44 108C43.9964 104.829 43.3713 101.69 42.16 98.76C42.0357 98.4544 41.9889 98.1229 42.0238 97.7949C42.0587 97.4669 42.1742 97.1526 42.36 96.88C42.5416 96.6114 42.7857 96.3909 43.0714 96.2376C43.3571 96.0843 43.6758 96.0028 44 96H118C118.53 96 119.039 96.2107 119.414 96.5858C119.789 96.9609 120 97.4696 120 98V118C120 118.53 119.789 119.039 119.414 119.414C119.039 119.789 118.53 120 118 120ZM46.84 116H116V100H46.84C47.6152 102.596 48.006 105.291 48 108C47.9949 110.708 47.6043 113.402 46.84 116Z"
                    fill="#6F47AE"
                  />
                  <path
                    d="M94 112H48C47.4696 112 46.9609 111.789 46.5858 111.414C46.2107 111.039 46 110.53 46 110C46 109.47 46.2107 108.961 46.5858 108.586C46.9609 108.211 47.4696 108 48 108H94C94.5304 108 95.0391 108.211 95.4142 108.586C95.7893 108.961 96 109.47 96 110C96 110.53 95.7893 111.039 95.4142 111.414C95.0391 111.789 94.5304 112 94 112Z"
                    fill="#6F47AE"
                  />
                  <path
                    d="M104 118C103.47 118 102.961 117.789 102.586 117.414C102.211 117.039 102 116.53 102 116V100C102 99.4696 102.211 98.9609 102.586 98.5858C102.961 98.2107 103.47 98 104 98C104.53 98 105.039 98.2107 105.414 98.5858C105.789 98.9609 106 99.4696 106 100V116C106 116.53 105.789 117.039 105.414 117.414C105.039 117.789 104.53 118 104 118Z"
                    fill="#6F47AE"
                  />
                  <path
                    d="M32.54 97.22C32.1553 97.2192 31.7789 97.1075 31.4561 96.8982C31.1333 96.6889 30.8777 96.3909 30.72 96.04L9.11999 47.66C8.04038 45.2409 7.96472 42.4923 8.90965 40.0175C9.85457 37.5427 11.7429 35.544 14.16 34.46L54.5 16.46C54.9436 16.3648 55.4065 16.4233 55.8125 16.6259C56.2185 16.8284 56.5436 17.1631 56.7343 17.5748C56.9251 17.9865 56.9701 18.4508 56.8621 18.8915C56.7541 19.3323 56.4995 19.7231 56.14 20L15.8 38C15.0705 38.3202 14.4121 38.7825 13.8632 39.3598C13.3143 39.9372 12.8859 40.618 12.6029 41.3627C12.3199 42.1074 12.1881 42.901 12.215 43.6972C12.242 44.4934 12.4273 45.2762 12.76 46L34.36 94.4C34.5764 94.8828 34.5927 95.4318 34.4053 95.9266C34.2179 96.4214 33.842 96.8217 33.36 97.04C33.1025 97.1574 32.823 97.2187 32.54 97.22Z"
                    fill="#999999"
                  />
                  <path
                    d="M33.48 45.36C33.0896 45.3614 32.7074 45.2485 32.3805 45.0352C32.0535 44.822 31.7961 44.5178 31.64 44.16C31.5334 43.9197 31.4753 43.6608 31.4689 43.398C31.4625 43.1352 31.508 42.8738 31.6027 42.6286C31.6975 42.3834 31.8396 42.1593 32.021 41.9691C32.2024 41.7788 32.4195 41.6262 32.66 41.52L49.1 34.18C49.3403 34.0736 49.5992 34.0156 49.8619 34.0093C50.1247 34.003 50.3861 34.0485 50.6312 34.1432C50.8764 34.238 51.1005 34.38 51.2907 34.5614C51.4809 34.7427 51.6336 34.9597 51.74 35.2C51.8463 35.4403 51.9043 35.6992 51.9106 35.962C51.917 36.2247 51.8714 36.4861 51.7767 36.7313C51.682 36.9764 51.5399 37.2005 51.3586 37.3907C51.1773 37.581 50.9603 37.7336 50.72 37.84L34.28 45.18C34.0286 45.2946 33.7562 45.3559 33.48 45.36Z"
                    fill="#666666"
                  />
                  <path
                    d="M32.88 58.76C32.4188 58.7721 31.9676 58.6243 31.6029 58.3418C31.2381 58.0592 30.9823 57.6593 30.8787 57.2097C30.7752 56.7601 30.8302 56.2885 31.0346 55.8749C31.2389 55.4612 31.58 55.131 32 54.94L45.56 48.94C46.0362 48.7599 46.5631 48.7682 47.0334 48.9631C47.5037 49.158 47.8819 49.525 48.091 49.9891C48.3002 50.4533 48.3244 50.9797 48.1589 51.4611C47.9933 51.9425 47.6504 52.3427 47.2 52.58L33.64 58.58C33.4009 58.6894 33.1427 58.7506 32.88 58.76Z"
                    fill="#666666"
                  />
                  <path
                    d="M37.78 69.7C37.3241 69.6979 36.8825 69.5401 36.5285 69.2527C36.1746 68.9653 35.9294 68.5656 35.8337 68.1198C35.738 67.674 35.7975 67.2089 36.0024 66.8015C36.2072 66.3942 36.5451 66.0691 36.96 65.88L41.54 63.88C42.0162 63.6999 42.5431 63.7082 43.0134 63.9031C43.4837 64.098 43.862 64.465 44.0711 64.9291C44.2802 65.3933 44.3045 65.9197 44.1389 66.4011C43.9733 66.8825 43.6304 67.2827 43.18 67.52L38.6 69.52C38.3425 69.6374 38.063 69.6987 37.78 69.7Z"
                    fill="#666666"
                  />
                  <path
                    d="M102 92C101.828 92.0303 101.652 92.0303 101.48 92C100.972 91.8596 100.541 91.5246 100.278 91.0678C100.016 90.6109 99.945 90.0691 100.08 89.56L115.8 32.22C116.005 31.4578 116.057 30.6627 115.954 29.8802C115.851 29.0978 115.595 28.3433 115.2 27.66C114.818 26.9722 114.3 26.3692 113.678 25.8879C113.055 25.4065 112.342 25.0568 111.58 24.86L65.3 12.16C63.77 11.7626 62.145 11.9851 60.7782 12.779C59.4113 13.5729 58.4129 14.8742 58 16.4L41.54 76.18C41.3322 76.9409 41.2765 77.7353 41.376 78.5178C41.4755 79.3002 41.7283 80.0554 42.12 80.74C42.9053 82.1225 44.2073 83.1368 45.74 83.56L62.24 88C62.7704 88.1379 63.2243 88.4809 63.5019 88.9535C63.7794 89.4261 63.8579 89.9896 63.72 90.52C63.5821 91.0504 63.2391 91.5044 62.7665 91.7819C62.2939 92.0595 61.7304 92.1379 61.2 92L44.7 87.4C42.1614 86.6916 40.0051 85.0097 38.7 82.72C38.047 81.5826 37.6276 80.3263 37.4662 79.0247C37.3048 77.7232 37.4047 76.4025 37.76 75.14L54 15.34C54.3451 14.0726 54.9366 12.8856 55.7406 11.8469C56.5446 10.8081 57.5453 9.93793 58.6857 9.28603C59.8261 8.63413 61.0837 8.21328 62.3867 8.04753C63.6898 7.88177 65.0127 7.97436 66.28 8.32001L112.62 21C115.175 21.6973 117.349 23.3798 118.665 25.6782C119.981 27.9767 120.332 30.7034 119.64 33.26L104 90.52C103.883 90.9563 103.621 91.3401 103.258 91.6089C102.895 91.8776 102.451 92.0155 102 92Z"
                    fill="#999999"
                  />
                  <path
                    d="M94.92 34.72C94.7406 34.7397 94.5595 34.7397 94.38 34.72L77.02 30C76.4896 29.8701 76.0325 29.5347 75.7493 29.0677C75.4661 28.6008 75.3801 28.0404 75.51 27.51C75.64 26.9796 75.9753 26.5225 76.4423 26.2393C76.9093 25.9561 77.4696 25.8701 78 26L95.36 30.76C95.6227 30.7942 95.876 30.8797 96.1056 31.0118C96.3352 31.1438 96.5365 31.3198 96.6981 31.5296C96.8597 31.7395 96.9783 31.9791 97.0473 32.2349C97.1162 32.4906 97.1342 32.7574 97.1 33.02C97.0659 33.2827 96.9803 33.536 96.8483 33.7656C96.7162 33.9952 96.5403 34.1965 96.3304 34.3581C96.1205 34.5197 95.8809 34.6383 95.6252 34.7073C95.3695 34.7762 95.1027 34.7942 94.84 34.76L94.92 34.72Z"
                    fill="#666666"
                  />
                  <path
                    d="M97.54 47.88C97.3606 47.8997 97.1795 47.8997 97 47.88L68 40C67.4696 39.8515 67.0199 39.4983 66.7498 39.0183C66.4798 38.5382 66.4115 37.9705 66.56 37.44C66.7085 36.9096 67.0617 36.4599 67.5418 36.1898C68.0219 35.9198 68.5896 35.8515 69.12 36L98 44C98.5305 44.069 99.0118 44.3458 99.3381 44.7697C99.6644 45.1935 99.809 45.7296 99.74 46.26C99.6711 46.7905 99.3942 47.2718 98.9704 47.5981C98.5466 47.9244 98.0105 48.069 97.48 48L97.54 47.88Z"
                    fill="#666666"
                  />
                  <path
                    d="M94.36 59.46C94.1879 59.4891 94.0121 59.4891 93.84 59.46L64.9 51.46C64.6354 51.3991 64.386 51.2849 64.1669 51.1245C63.9479 50.9641 63.7638 50.7607 63.6259 50.5268C63.488 50.2929 63.3991 50.0334 63.3648 49.7641C63.3304 49.4947 63.3513 49.2212 63.426 48.9602C63.5008 48.6992 63.6279 48.4561 63.7997 48.2459C63.9714 48.0356 64.1842 47.8624 64.425 47.7371C64.6659 47.6117 64.9297 47.5366 65.2005 47.5165C65.4712 47.4964 65.7433 47.5316 66 47.62L94.94 55.62C95.4476 55.7604 95.8793 56.0954 96.1415 56.5523C96.4036 57.0091 96.4749 57.5509 96.34 58.06C96.2088 58.478 95.9441 58.8414 95.5864 59.0943C95.2286 59.3472 94.7978 59.4757 94.36 59.46Z"
                    fill="#666666"
                  />
                  <path
                    d="M91.2 71.04C91.0212 71.0691 90.8388 71.0691 90.66 71.04L61.72 63.04C61.2081 62.8994 60.7731 62.5613 60.5105 62.1C60.248 61.6386 60.1794 61.0919 60.32 60.58C60.4606 60.0681 60.7987 59.6331 61.26 59.3705C61.7214 59.108 62.2681 59.0394 62.78 59.18L91.72 67.18C91.9735 67.2494 92.2109 67.3682 92.4185 67.5294C92.6262 67.6907 92.8 67.8913 92.93 68.1198C93.06 68.3482 93.1437 68.6001 93.1763 68.861C93.2089 69.1218 93.1898 69.3866 93.12 69.64C92.9917 70.048 92.736 70.4041 92.3904 70.6561C92.0449 70.908 91.6276 71.0426 91.2 71.04Z"
                    fill="#666666"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Projects Yet
              </h2>
              <p className="text-gray-600 mb-6">
                It looks like you haven't created any
                <br />
                projects. Let's get started!
              </p>
              <CreateProjectButton
                onCreateProject={handleCreateProject}
                variant="main"
                isAuthenticated={isAuthenticated}
              />
            </div>
          ) : (
            /* Projects List */
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                All Projects
              </h1>

              {/* Search Bar */}
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search in all projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white border-gray-200 h-12"
                />
              </div>

              {/* Projects Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedProjects.size === filteredProjects.length &&
                            filteredProjects.length > 0
                          }
                          onChange={toggleAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Owner
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                        Last Modified
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700 text-sm">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedProjects.has(project.id)}
                            onChange={() => toggleProject(project.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/editor/${project.id}`}
                            className="text-gray-900 hover:text-purple-600 font-medium"
                          >
                            {project.title}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {project.owner}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {project.lastModified} by {project.modifiedBy}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleCopyClick(project.id, project.title)
                              }
                              className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleArchiveClick(project.id, project.title)
                              }
                              className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(project.id, project.title)
                              }
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Showing {filteredProjects.length} out of {projects.length}{" "}
                projects
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Copy Project Modal */}
      <CopyProjectModal
        open={copyModalOpen}
        onOpenChange={setCopyModalOpen}
        onConfirm={handleCopyConfirm}
        originalProjectTitle={projectToCopy?.title || ""}
      />

      {/* Archive Project Modal */}
      <ArchiveProjectModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleArchiveConfirm}
        projectTitle={projectToArchive?.title || ""}
      />

      {/* Trash Project Modal */}
      <TrashProjectModal
        open={trashModalOpen}
        onOpenChange={setTrashModalOpen}
        onConfirm={handleDeleteConfirm}
        projectTitle={projectToDelete?.title || ""}
      />
    </div>
  );
}
