"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OverleafWordmark } from "@/components/overleaf-logo";
import {
  Check,
  Plus,
  FolderOpen,
  Users,
  Share2,
  Archive,
  ShoppingCart,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ColorOption {
  id: string;
  color: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function PrintOrderPage() {
  const router = useRouter();
  const [coverMaterial, setCoverMaterial] = useState<"glossy" | "matte">(
    "glossy"
  );
  const [selectedColor, setSelectedColor] = useState<string>("teal");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const colorOptions: ColorOption[] = [
    { id: "teal", color: "#0d5c63", name: "Teal" },
    { id: "magenta", color: "#9b2335", name: "Magenta" },
    { id: "navy", color: "#2e4a7d", name: "Navy" },
  ];

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            query: `
              query {
                authenticatedItem {
                  ... on User {
                    id
                    name
                    email
                  }
                }
              }
            `,
          }),
        });

        const data = await response.json();
        if (data.data?.authenticatedItem) {
          setCurrentUser(data.data.authenticatedItem);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query: `
            mutation {
              endSession
            }
          `,
        }),
      });

      setCurrentUser(null);
      setIsAuthenticated(false);
      setIsDropdownOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePayAndOrder = () => {
    // Handle payment and order logic
    alert("Redirecting to payment...");
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

        <Link href="/projects">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-6">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>

        <nav className="space-y-1 mb-6">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#3d3254] hover:text-white transition-colors"
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
            href="/print-order"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#3d3254] text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>My Orders</span>
          </Link>
        </nav>

        <div className="mt-auto">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Print and Order
          </h1>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Customize Your Print Options
            </h2>

            {/* Cover Material */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">
                Cover Material
              </h3>

              <div className="space-y-3">
                {/* Glossy Option */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    coverMaterial === "glossy"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="coverMaterial"
                    value="glossy"
                    checked={coverMaterial === "glossy"}
                    onChange={() => setCoverMaterial("glossy")}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Glossy</p>
                    <p className="text-sm text-gray-500">
                      A shiny, reflective finish that enhances colors and makes
                      images pop
                    </p>
                  </div>
                </label>

                {/* Matte Option */}
                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    coverMaterial === "matte"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="coverMaterial"
                    value="matte"
                    checked={coverMaterial === "matte"}
                    onChange={() => setCoverMaterial("matte")}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Matte</p>
                    <p className="text-sm text-gray-500">
                      A smooth, non-reflective finish that provides a more
                      elegant look
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Cover Color */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">
                Cover Color
              </h3>

              <div className="flex items-center gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedColor(option.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      selectedColor === option.id
                        ? "ring-2 ring-offset-2 ring-purple-500"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: option.color }}
                    title={option.name}
                  >
                    {selectedColor === option.id && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </button>
                ))}

                {/* Add Custom Color Button */}
                <button
                  className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-all"
                  title="Add custom color"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pay and Order Button */}
            <Button
              onClick={handlePayAndOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
            >
              Pay And Order
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
