"use client";

import { useEffect, useRef, useState } from "react";

interface LatexEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LatexEditor({ value, onChange }: LatexEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sync scroll between textarea and highlight layer
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setScrollTop(target.scrollTop);
    setScrollLeft(target.scrollLeft);
  };

  // Update highlight layer scroll
  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollTop, scrollLeft]);

  // Syntax highlighting for LaTeX
  const highlightLatex = (code: string): string => {
    if (!code) return "";

    // Escape HTML
    let highlighted = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Comments (green)
    highlighted = highlighted.replace(
      /(%.+$)/gm,
      '<span style="color: #6A9955;">$1</span>'
    );

    // Commands (blue/purple)
    highlighted = highlighted.replace(
      /(\\[a-zA-Z]+)/g,
      '<span style="color: #569CD6;">$1</span>'
    );

    // Braces and brackets (yellow)
    highlighted = highlighted.replace(
      /([{}[\]])/g,
      '<span style="color: #FFD700;">$1</span>'
    );

    // Document class and packages (purple)
    highlighted = highlighted.replace(
      /(\\documentclass|\\usepackage|\\begin|\\end|\\section|\\title|\\author|\\date|\\maketitle)/g,
      '<span style="color: #C586C0;">$1</span>'
    );

    // Strings in braces (orange)
    highlighted = highlighted.replace(
      /\{([^}]+)\}/g,
      '{<span style="color: #CE9178;">$1</span>}'
    );

    return highlighted;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      // Set cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const lines = value.split("\n");

  return (
    <div className="relative h-full flex bg-[#1e1e2e]">
      {/* Line Numbers */}
      <div className="flex-shrink-0 bg-[#1e1e2e] text-gray-500 text-right pr-3 pl-2 py-4 text-sm font-mono select-none overflow-hidden">
        {lines.map((_, index) => (
          <div key={index} className="leading-6 h-6">
            {index + 1}
          </div>
        ))}
      </div>

      {/* Editor Container */}
      <div className="relative flex-1 overflow-hidden">
        {/* Syntax Highlighting Layer */}
        <div
          ref={highlightRef}
          className="absolute inset-0 p-4 font-mono text-sm leading-6 pointer-events-none overflow-auto whitespace-pre"
          style={{
            color: "transparent",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          dangerouslySetInnerHTML={{
            __html: highlightLatex(value),
          }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 p-4 font-mono text-sm leading-6 resize-none outline-none bg-transparent text-white caret-white overflow-auto"
          style={{
            caretColor: "white",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        textarea::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        textarea::-webkit-scrollbar-track {
          background: #1e1e2e;
        }
        textarea::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border-radius: 6px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: #5a5a5a;
        }
      `}</style>
    </div>
  );
}
