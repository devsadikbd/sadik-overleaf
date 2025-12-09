import { NextRequest, NextResponse } from "next/server";
import { graphqlRequest } from "@/lib/keystone";
import { CREATE_PROJECT_MUTATION } from "@/lib/graphql/queries";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "POST body missing, invalid Content-Type, or JSON object has no keys." },
        { status: 400 }
      );
    }

    const { title } = body;

    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    // Create project via GraphQL
    try {
      const data = await graphqlRequest(CREATE_PROJECT_MUTATION, { title: title.trim() });
      return NextResponse.json(data, { status: 201 });
    } catch (graphqlError: any) {
      console.error("GraphQL error creating project:", graphqlError);
      return NextResponse.json(
        { error: graphqlError.message || "Failed to create project via GraphQL" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Create project error:", error);
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
