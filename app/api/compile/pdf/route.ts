import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  let tempDir: string | null = null;

  try {
    const body = await request.json();
    const { projectId, content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "No LaTeX content provided" },
        { status: 400 }
      );
    }

    // Create a unique temporary directory for this compilation
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "latex-"));
    const texFilePath = path.join(tempDir, "document.tex");
    const pdfFilePath = path.join(tempDir, "document.pdf");

    // Write the LaTeX content to a file
    await fs.writeFile(texFilePath, content, "utf-8");

    console.log(`Compiling LaTeX for project ${projectId} in ${tempDir}`);

    // Run pdflatex twice to resolve references
    try {
      // First pass
      await execAsync(
        `pdflatex -interaction=nonstopmode -output-directory="${tempDir}" "${texFilePath}"`,
        {
          timeout: 60000, // 60 second timeout
          cwd: tempDir,
        }
      );

      // Second pass for references
      await execAsync(
        `pdflatex -interaction=nonstopmode -output-directory="${tempDir}" "${texFilePath}"`,
        {
          timeout: 60000,
          cwd: tempDir,
        }
      );
    } catch (compileError: any) {
      // pdflatex returns non-zero exit code even for warnings
      // Check if PDF was still generated
      console.log("pdflatex output:", compileError.stdout);
      console.log("pdflatex stderr:", compileError.stderr);
    }

    // Check if PDF was created
    try {
      await fs.access(pdfFilePath);
    } catch {
      // Read the log file for error details
      const logFilePath = path.join(tempDir, "document.log");
      let errorDetails = "Unknown compilation error";
      try {
        const logContent = await fs.readFile(logFilePath, "utf-8");
        // Extract error lines from the log
        const errorLines = logContent
          .split("\n")
          .filter((line) => line.startsWith("!") || line.includes("Error"))
          .slice(0, 10)
          .join("\n");
        if (errorLines) {
          errorDetails = errorLines;
        }
      } catch {
        // Log file not available
      }

      return NextResponse.json(
        { error: "LaTeX compilation failed", details: errorDetails },
        { status: 500 }
      );
    }

    // Read the generated PDF
    const pdfBuffer = await fs.readFile(pdfFilePath);

    // Clean up temp directory
    await cleanupTempDir(tempDir);
    tempDir = null;

    // Return the PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="document.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF compilation error:", error);

    // Clean up on error
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }

    return NextResponse.json(
      {
        error: "Failed to compile PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function cleanupTempDir(dirPath: string) {
  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      await fs.unlink(path.join(dirPath, file));
    }
    await fs.rmdir(dirPath);
  } catch (error) {
    console.error("Failed to cleanup temp directory:", error);
  }
}
