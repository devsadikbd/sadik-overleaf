import { EditorLayout } from "@/components/editor-layout";

export default function EditorPage({ params }: { params: { id: string } }) {
  return <EditorLayout projectId={params.id} />;
}
