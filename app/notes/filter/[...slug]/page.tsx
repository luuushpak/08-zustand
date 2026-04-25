import { fetchNotes } from "@/lib/api";
import { DEFAULT_QUERY, DEFAULT_PAGE } from "@/constants/notes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "all" : slug[0];

  return {
    title: `NoteHub - ${tag}`,
    description: "Notes app with filtering by tag.",
    openGraph: {
      title: `NoteHub - ${tag}`,
      description: "Easily organize and filter your notes using tags.",
      url: `https://08-zustand-iota-ebon.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub - ${tag}",
        },
      ],
    },
  };
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
