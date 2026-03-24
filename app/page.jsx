import dynamicImport from "next/dynamic";

const KanbanBoard = dynamicImport(
  () => import("../components/board/KanbanBoard"),
  { ssr: false },
);

export default function Home() {
  return <KanbanBoard />;
}
