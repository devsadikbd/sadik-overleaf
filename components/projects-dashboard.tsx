"use client";

import { useState } from "react";
import Link from "next/link";
import { OverleafWordmark } from "@/components/overleaf-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  owner: string;
  lastModified: string;
  modifiedBy: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Enhancing User Engagement in E-commerce ...",
    owner: "You",
    lastModified: "a few seconds ago",
    modifiedBy: "you",
  },
  {
    id: "2",
    title: "Designing for Accessibility ...",
    owner: "You",
    lastModified: "12 minutes ago",
    modifiedBy: "you",
  },
  {
    id: "3",
    title: "The Role of Minimalist Design in Educational ...",
    owner: "You",
    lastModified: "a few seconds ago",
    modifiedBy: "you",
  },
  {
    id: "4",
    title: "Enhancing User Engagement in E-commerce ...",
    owner: "You",
    lastModified: "2 minutes ago",
    modifiedBy: "you",
  },
  {
    id: "5",
    title: "Enhancing User Engagement in E-commerce ...",
    owner: "You",
    lastModified: "a few seconds ago",
    modifiedBy: "you",
  },
];

export function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(
    new Set()
  );

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
    <div className="flex w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2d2546] text-white p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/home" className="flex items-center gap-2">
            <OverleafWordmark variant="white" className="h-6" />
          </Link>
        </div>
        <Button className="w-full mb-6 bg-[#7c3fed] hover:bg-[#6a35d4] text-white font-medium">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
        <nav className="flex-1 space-y-1">
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
        </nav>{" "}
        <div className="mt-auto p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
          <p className="text-[#2d2546] font-semibold mb-3">
            You are on the
            <br />7
            free plan
          </p>
          <Button className="bg-[#2d2546] hover:bg-[#1f1a32] text-white px-6">
            Upgrade
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Top Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/home"
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
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              S
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {filteredProjects.length === 0 && searchQuery === "" ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-6">
                <svg
                  className="w-32 h-32 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
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
                            href={`/project/${project.id}`}
                            className="text-gray-900 hover:text-purple-600"
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
                            <button className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded">
                              <Copy className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded">
                              <Archive className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
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
    </div>
  );
}
