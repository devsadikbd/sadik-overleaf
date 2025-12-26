import { EditorLayout } from "@/components/editor-layout";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditorLayout projectId={id} />;
}
