import { fetchNotes } from "@/lib/api";
import { DEFAULT_QUERY, DEFAULT_PAGE } from "@/constants/notes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", DEFAULT_QUERY, DEFAULT_PAGE, tag],
    queryFn: () =>
      fetchNotes({
        query: DEFAULT_QUERY,
        page: DEFAULT_PAGE,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default Notes;
